const userData = JSON.parse(localStorage.getItem('userData'));
if (userData) {
    console.log('Data pengguna:', userData);
} else {
    // Redirect kembali ke formulir jika data tidak ada
    window.location.href = 'formulir.html';
}

document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('data-diri-form');
            const namaInput = document.getElementById('nama');
            const emailInput = document.getElementById('email');
            const teleponInput = document.getElementById('telepon');
            const successMessage = document.getElementById('success-message');
            const submitBtn = document.getElementById('submit-btn');
            
            // Validasi real-time
            namaInput.addEventListener('blur', function() {
                validateNama();
            });
            
            emailInput.addEventListener('blur', function() {
                validateEmail();
            });
            
            teleponInput.addEventListener('blur', function() {
                validateTelepon();
            });
            
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const isNamaValid = validateNama();
                const isEmailValid = validateEmail();
                const isTeleponValid = validateTelepon();
                
                if (isNamaValid && isEmailValid && isTeleponValid) {
                    // Tampilkan pesan sukses
                    successMessage.style.display = 'block';
                    submitBtn.disabled = true;
                    
                    // Simpan data ke localStorage (simulasi)
                    const userData = {
                        nama: namaInput.value,
                        email: emailInput.value,
                        telepon: teleponInput.value
                    };
                    localStorage.setItem('userData', JSON.stringify(userData));
                    
                    // Redirect ke halaman berikutnya setelah 2 detik
                    setTimeout(function() {
                        window.location.href = 'question_pages/question.html';
                    }, 2000);
                }
            });
            
            function validateNama() {
                const errorElement = document.getElementById('nama-error');
                if (namaInput.value.trim() === '') {
                    showError(namaInput, errorElement, 'Nama harus diisi');
                    return false;
                } else {
                    hideError(namaInput, errorElement);
                    return true;
                }
            }
            
            function validateEmail() {
                const errorElement = document.getElementById('email-error');
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                if (emailInput.value === '') {
                    showError(emailInput, errorElement, 'Email harus diisi');
                    return false;
                } else if (!emailPattern.test(emailInput.value)) {
                    showError(emailInput, errorElement, 'Masukkan alamat email yang valid');
                    return false;
                } else {
                    hideError(emailInput, errorElement);
                    return true;
                }
            }
            
            function validateTelepon() {
                const errorElement = document.getElementById('telepon-error');
                const teleponPattern = /^[0-9]{10,13}$/;
                
                if (teleponInput.value === '') {
                    showError(teleponInput, errorElement, 'Nomor telepon harus diisi');
                    return false;
                } else if (!teleponPattern.test(teleponInput.value)) {
                    showError(teleponInput, errorElement, 'Masukkan nomor telepon yang valid (10-13 digit)');
                    return false;
                } else {
                    hideError(teleponInput, errorElement);
                    return true;
                }
            }
            
            function showError(input, errorElement, message) {
                input.classList.add('error');
                errorElement.textContent = message;
                errorElement.style.display = 'block';
            }
            
            function hideError(input, errorElement) {
                input.classList.remove('error');
                errorElement.style.display = 'none';
            }
        });