// Quiz state
        const totalPages = 6; // Total number of question pages
        let currentPage = 1;
        const userAnswers = {};
        let timeLeft = 5400; // in seconds (90 minutes)
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
            
            updateProgress();
        }
        
        // Start the countdown timer
        function startTimer() {
            timerInterval = setInterval(() => {
                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    alert('Waktu telah habis! Kuis akan diserahkan.');
                    // Here you can add code to auto-submit the quiz
                    return;
                }
                
                timeLeft--;
                updateTimerDisplay();
            }, 1000);
        }
        
        // Update timer display
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
            
            // Update progress bar
            updateProgress();
        }
        
        // Update progress bar
        function updateProgress() {
            const progressPercentage = (currentPage / totalPages) * 100;
            document.getElementById('progress').style.width = `${progressPercentage}%`;
            document.getElementById('progress-percent').textContent = `${Math.round(progressPercentage)}%`;
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
            
        }
        
        // Initialize the quiz
        window.onload = function() {
            initPagination();
            startTimer();
            updateTimerDisplay();
        };