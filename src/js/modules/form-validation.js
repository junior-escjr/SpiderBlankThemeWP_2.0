// Form validation module - jQuery version

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
    const $forms = $('form[data-validate]');

    $forms.each(function() {
      const $form = $(this);
      
      $form.on('submit', function(e) {
        if (!this.validateForm($form[0])) {
          e.preventDefault();
        }
      }.bind(this));

      // Real-time validation
      const $inputs = $form.find('input, textarea, select');
      $inputs.each(function() {
        const $input = $(this);
        
        $input.on('blur', function() {
          this.validateField($input[0]);
        }.bind(this));

        $input.on('input', function() {
          if ($input.hasClass('error')) {
            this.validateField($input[0]);
          }
        }.bind(this));
      });
    }.bind(this));
  }

  validateForm(form) {
    let isValid = true;
    const $fields = $(form).find('[required], [data-validate]');

    $fields.each(function() {
      if (!this.validateField(this)) {
        isValid = false;
      }
    }.bind(this));

    return isValid;
  }

  validateField(field) {
    const $field = $(field);
    const value = $field.val().trim();
    const fieldType = $field.attr('type') || field.tagName.toLowerCase();
    const validationType = $field.attr('data-validate');
    let isValid = true;
    let errorMessage = '';

    // Clear previous errors
    this.clearFieldError(field);

    // Required validation
    if ($field.attr('required') && !value) {
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
    const $field = $(field);
    $field.addClass('error');

    let $errorElement = $field.next('.field-error');
    if (!$errorElement.length) {
      $errorElement = $('<span>').addClass('field-error text-red-600 text-sm mt-1');
      $field.after($errorElement);
    }

    $errorElement.text(message);
  }

  clearFieldError(field) {
    const $field = $(field);
    $field.removeClass('error');

    const $errorElement = $field.next('.field-error');
    if ($errorElement.length) {
      $errorElement.remove();
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
    const $contactForm = $('.contact-form');

    if ($contactForm.length) {
      $contactForm.on('submit', function(e) {
        e.preventDefault();

        if (this.validateForm($contactForm[0])) {
          this.submitContactForm($contactForm[0]);
        }
      }.bind(this));
    }
  }

  setupCommentForm() {
    const $commentForm = $('.comment-form');

    if ($commentForm.length) {
      $commentForm.on('submit', function(e) {
        e.preventDefault();

        if (this.validateForm($commentForm[0])) {
          this.submitCommentForm($commentForm[0]);
        }
      }.bind(this));
    }
  }

  async submitContactForm(form) {
    const $form = $(form);
    const $submitButton = $form.find('button[type="submit"]');
    const originalText = $submitButton.text();

    // Show loading state
    $submitButton.prop('disabled', true).text('Enviando...');

    try {
      // Simulate form submission (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Show success message
      this.showFormMessage(form, 'Mensagem enviada com sucesso!', 'success');

      // Reset form
      $form[0].reset();

    } catch (error) {
      // Show error message
      this.showFormMessage(form, 'Erro ao enviar mensagem. Tente novamente.', 'error');
    } finally {
      // Restore button
      $submitButton.prop('disabled', false).text(originalText);
    }
  }

  async submitCommentForm(form) {
    const $form = $(form);
    const $submitButton = $form.find('button[type="submit"]');
    const originalText = $submitButton.text();

    $submitButton.prop('disabled', true).text('Enviando...');

    try {
      // Simulate comment submission
      await new Promise(resolve => setTimeout(resolve, 1500));

      this.showFormMessage(form, 'Comentário enviado com sucesso!', 'success');
      $form[0].reset();

    } catch (error) {
      this.showFormMessage(form, 'Erro ao enviar comentário. Tente novamente.', 'error');
    } finally {
      $submitButton.prop('disabled', false).text(originalText);
    }
  }

  showFormMessage(form, message, type) {
    const $form = $(form);
    
    // Remove existing messages
    $form.siblings('.form-message').remove();

    // Create message element
    const $messageElement = $('<div>').addClass(`form-message p-4 rounded-md mb-4 ${
      type === 'success'
        ? 'bg-green-50 text-green-800 border border-green-200'
        : 'bg-red-50 text-red-800 border border-red-200'
    }`).text(message);

    // Insert before form
    $form.before($messageElement);

    // Auto-remove after 5 seconds
    setTimeout(function() {
      $messageElement.remove();
    }, 5000);
  }
}
