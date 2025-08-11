const inputs = document.querySelectorAll('.code');
    const form = document.getElementById('otpForm');

    // Auto focus next input on input
    inputs.forEach((input, index) => {
      input.addEventListener('input', (e) => {
        const value = e.target.value;

        // Allow only digits
        if (!/^\d$/.test(value)) {
          e.target.value = '';
          return;
        }

        // Move to next field
        if (index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      });

      // Handle backspace
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace') {
          if (input.value === '') {
            if (index > 0) {
              inputs[index - 1].focus();
              inputs[index - 1].value = '';
              e.preventDefault();
            }
          } else {
            input.value = '';
          }
        } else if (e.key >= '0' && e.key <= '9') {
          // Clear value before typing a new digit (in case of auto-fill)
          input.value = '';
        }
      });

      // Handle paste
      input.addEventListener('paste', (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text').trim();
        if (!/^\d{6}$/.test(pasteData)) return;

        for (let i = 0; i < inputs.length; i++) {
          inputs[i].value = pasteData[i];
        }

        inputs[inputs.length - 1].focus();
      });
    });

    // Focus on first input on load
    window.addEventListener('load', () => {
      inputs[0].focus();
    });

    // Handle submit
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const otp = Array.from(inputs)
        .map(input => input.value)
        .join('');

      if (otp.length !== 6) {
        alert("Please enter all 6 digits of the OTP.");
        return;
      }

      console.log("Submitted OTP:", otp);


    });