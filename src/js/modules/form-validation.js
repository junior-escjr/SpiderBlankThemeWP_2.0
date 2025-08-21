// Form validation module

export default class FormValidation {
  constructor() {
    this.init();
  }

  init() {
    this.setupFormValidation();
    this.setupContactForm();
    this.setupCommentForm();
  }

  setupFormValidation() {
    const forms = document.querySelectorAll('form[data-validate]');

    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        if (!this.validateForm(form)) {
          e.preventDefault();
        }
      });

      // Real-time validation
      const inputs = form.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        input.addEventListener('blur', () => {
          this.validateField(input);
        });

        input.addEventListener('input', () => {
          if (input.classList.contains('error')) {
            this.validateField(input);
          }
        });
      });
    });
  }

  validateForm(form) {
    let isValid = true;
    const fields = form.querySelectorAll('[required], [data-validate]');

    fields.forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    return isValid;
  }

  validateField(field) {
    const value = field.value.trim();
    const fieldType = field.getAttribute('type') || field.tagName.toLowerCase();
    const validationType = field.getAttribute('data-validate');
    let isValid = true;
    let errorMessage = '';

    // Clear previous errors
    this.clearFieldError(field);

    // Required validation
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'Este campo é obrigatório';
    }

    // Type-specific validation
    if (isValid && value) {
      switch (fieldType) {
        case 'email':
          if (!this.isValidEmail(value)) {
            isValid = false;
            errorMessage = 'Digite um e-mail válido';
          }
          break;

        case 'url':
          if (!this.isValidUrl(value)) {
            isValid = false;
            errorMessage = 'Digite uma URL válida';
          }
          break;
      }
    }

    // Custom validation
    if (isValid && validationType) {
      switch (validationType) {
        case 'name':
          if (value.length < 2) {
            isValid = false;
            errorMessage = 'Nome deve ter pelo menos 2 caracteres';
          }
          break;

        case 'phone':
          if (!this.isValidPhone(value)) {
            isValid = false;
            errorMessage = 'Digite um telefone válido';
          }
          break;

        case 'message':
          if (value.length < 10) {
            isValid = false;
            errorMessage = 'Mensagem deve ter pelo menos 10 caracteres';
          }
          break;
      }
    }

    // Show/hide error
    if (!isValid) {
      this.showFieldError(field, errorMessage);
    }

    return isValid;
  }

  showFieldError(field, message) {
    field.classList.add('error');

    let errorElement = field.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains('field-error')) {
      errorElement = document.createElement('span');
      errorElement.className = 'field-error text-red-600 text-sm mt-1';
      field.parentNode.insertBefore(errorElement, field.nextSibling);
    }

    errorElement.textContent = message;
  }

  clearFieldError(field) {
    field.classList.remove('error');

    const errorElement = field.nextElementSibling;
    if (errorElement && errorElement.classList.contains('field-error')) {
      errorElement.remove();
    }
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
  }

  setupContactForm() {
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (this.validateForm(contactForm)) {
          this.submitContactForm(contactForm);
        }
      });
    }
  }

  setupCommentForm() {
    const commentForm = document.querySelector('.comment-form');

    if (commentForm) {
      commentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (this.validateForm(commentForm)) {
          this.submitCommentForm(commentForm);
        }
      });
    }
  }

  async submitContactForm(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    // Show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';

    try {
      // Simulate form submission (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Show success message
      this.showFormMessage(form, 'Mensagem enviada com sucesso!', 'success');

      // Reset form
      form.reset();

    } catch (error) {
      // Show error message
      this.showFormMessage(form, 'Erro ao enviar mensagem. Tente novamente.', 'error');
    } finally {
      // Restore button
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  }

  async submitCommentForm(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';

    try {
      // Simulate comment submission
      await new Promise(resolve => setTimeout(resolve, 1500));

      this.showFormMessage(form, 'Comentário enviado com sucesso!', 'success');
      form.reset();

    } catch (error) {
      this.showFormMessage(form, 'Erro ao enviar comentário. Tente novamente.', 'error');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  }

  showFormMessage(form, message, type) {
    // Remove existing messages
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message p-4 rounded-md mb-4 ${
      type === 'success'
        ? 'bg-green-50 text-green-800 border border-green-200'
        : 'bg-red-50 text-red-800 border border-red-200'
    }`;

    messageElement.textContent = message;

    // Insert before form
    form.parentNode.insertBefore(messageElement, form);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (messageElement.parentNode) {
        messageElement.remove();
      }
    }, 5000);
  }
}
