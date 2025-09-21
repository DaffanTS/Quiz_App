// Quiz state
        const totalPages = 5;
        let currentPage = 1;
        const userAnswers = {};
        // Set time to 30 hours in seconds (30:00:00 format)
        let timeLeft = 30 * 60 * 60; // 30 hours in seconds
        let timerInterval;
        
        // Initialize pagination
        function initPagination() {
            const paginationContainer = document.getElementById('pagination');
            
            for (let i = 1; i <= totalPages; i++) {
                const pageNumber = document.createElement('div');
                pageNumber.classList.add('page-number');
                pageNumber.textContent = i;
                pageNumber.setAttribute('data-page', i);
                pageNumber.addEventListener('click', () => goToPage(i));
                
                if (i === 1) pageNumber.classList.add('active');
                
                paginationContainer.appendChild(pageNumber);
            }
        }
        
        // Start the countdown timer
        function startTimer() {
            timerInterval = setInterval(() => {
                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    alert('Waktu telah habis! Kuis akan diserahkan.');
                    submitQuiz();
                    return;
                }
                
                timeLeft--;
                updateTimerDisplay();
            }, 1000);
        }
        
        // Update timer display in HH:MM:SS format
        function updateTimerDisplay() {
            const hours = Math.floor(timeLeft / 3600);
            const minutes = Math.floor((timeLeft % 3600) / 60);
            const seconds = timeLeft % 60;
            
            document.getElementById('time').textContent = 
                `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        
        // Navigate between pages
        function navigate(direction) {
            const newPage = currentPage + direction;
            
            if (newPage >= 1 && newPage <= totalPages) {
                goToPage(newPage);
            }
        }
        
        // Go to specific page
        function goToPage(pageNumber) {
            // Hide current page
            document.getElementById(`page-${currentPage}`).classList.remove('active');
            
            // Update current page
            currentPage = pageNumber;
            
            // Show new page
            document.getElementById(`page-${currentPage}`).classList.add('active');
            
            // Update pagination numbers
            document.querySelectorAll('.page-number').forEach((number, index) => {
                if (index + 1 === currentPage) {
                    number.classList.add('active');
                } else {
                    number.classList.remove('active');
                }
            });
            
            // Update navigation buttons
            document.getElementById('prev-btn').disabled = currentPage === 1;
            document.getElementById('next-btn').disabled = currentPage === totalPages;
        }
        
        // Select an option
        function selectOption(optionElement, pageNumber) {
            // Remove selected class from all options on this page
            const options = document.querySelectorAll(`#page-${pageNumber} .option`);
            options.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option
            optionElement.classList.add('selected');
            
            // Store the answer
            userAnswers[pageNumber] = optionElement.textContent;
            
            // Auto-advance to next page if not the last page
            if (pageNumber < totalPages) {
                setTimeout(() => navigate(1), 500);
            }
        }
        
        // Submit the quiz
        function submitQuiz() {
            // Check if all questions are answered
            const answeredQuestions = Object.keys(userAnswers).length;
            if (answeredQuestions < totalPages) {
                if (confirm(`Anda belum menjawab semua pertanyaan. ${totalPages - answeredQuestions} pertanyaan belum dijawab. Apakah Anda yakin ingin mengirim?`)) {
                    completeSubmission();
                }
            } else {
                completeSubmission();
            }
        }
        
        // Complete the quiz submission
        function completeSubmission() {
            clearInterval(timerInterval);
            alert('Terima kasih! Jawaban Anda telah dikirim.\n\nAnda akan diarahkan ke halaman hasil.');
            // Here you would typically redirect to results page or process the data
        }
        
        // Initialize the quiz
        window.onload = function() {
            initPagination();
            startTimer();
            updateTimerDisplay();
        };