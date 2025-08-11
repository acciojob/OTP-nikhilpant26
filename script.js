const inputs = document.querySelectorAll('.code');

    inputs.forEach((input, index) => {
      input.addEventListener('input', (e) => {
        const value = e.target.value;
        if (value.length === 1 && index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      });

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace') {
          if (input.value === '') {
            if (index > 0) {
              inputs[index - 1].focus();
              inputs[index - 1].value = '';
            }
          } else {
            input.value = '';
          }
          e.preventDefault();
        } else if (e.key >= '0' && e.key <= '9') {
          // Allow digit input
        } else if (e.key !== 'Tab') {
          e.preventDefault(); // Prevent non-numeric characters
        }
      });

      input.addEventListener('paste', (e) => {
        e.preventDefault();
        const pasteData = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '');
        pasteData.split('').forEach((char, i) => {
          if (i < inputs.length) {
            inputs[i].value = char;
          }
        });
        const filled = Math.min(pasteData.length, inputs.length);
        if (filled < inputs.length) {
          inputs[filled].focus();
        } else {
          inputs[inputs.length - 1].focus();
        }
      });
    });

    // Autofocus first input on page load
    window.addEventListener('load', () => {
      inputs[0].focus();
    });