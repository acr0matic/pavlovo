const forms = document.querySelectorAll('form');

forms.forEach(form => {
  const action = form.getAttribute('action')
  const type = form.getAttribute('data-form');

  const fields = form.querySelectorAll('input, textarea');
  const requiredFields = form.querySelectorAll('[data-required]');
  const button = form.querySelector('.button');

  let formData;

  requiredFields.forEach(field => {
    field.addEventListener('click', () => {
      field.classList.remove('input__field--error');
    });
  });

  form.onsubmit = async (e) => {
    e.preventDefault();

    if (InputValidation(requiredFields)) {
      formData = new FormData(form);
      formData.append('form_type', type);

      try {
        button.classList.add('button--send');
        button.querySelector('.button__text').innerHTML = 'Отправляем';

        const response = await fetch(action, {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();
        console.log(result);

        MicroModal.show('modal-accept', {
          awaitCloseAnimation: true,
          disableFocus: true,
          disableScroll: true,
        });

        button.classList.remove('button--send');
        button.querySelector('.button__text').innerHTML = 'Отправить';

        ClearForm(fields);
      }

      catch (error) {
        console.error('Ошибка на стороне сервера: ' + error);
      }
    }
  };
});


function ClearForm(fields) {
  fields.forEach((field) => field.value = '');
}

function InputValidation(inputs) {
  let isValide = false;

  inputs.forEach((field) => {
    if (!field.value) field.classList.add('input__field--error');
  });

  const BreakException = {};
  inputs.forEach((field) => {
    try {
      isValide = !field.classList.contains('input__field--error');

      if (!isValide) throw BreakException;
    } catch (e) {
      if (e !== BreakException) throw e;
    }
  });

  return isValide;
}