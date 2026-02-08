// Feedback page functionality

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('feedbackForm').addEventListener('submit', handleSubmit);
    document.getElementById('sendAnother').addEventListener('click', resetForm);
    setupFAQ();
});

function handleSubmit(e) {
    e.preventDefault();
    
    document.querySelectorAll('.error').forEach(el => el.textContent = '');
    
    const name = document.getElementById('userName').value.trim();
    const email = document.getElementById('userEmail').value.trim();
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value.trim();
    
    let valid = true;
    
    if (name.length < 2) {
        document.getElementById('nameError').textContent = 'Name too short';
        valid = false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Invalid email';
        valid = false;
    }
    
    if (!subject) {
        document.getElementById('subjectError').textContent = 'Please select a subject';
        valid = false;
    }
    
    if (message.length < 10) {
        document.getElementById('messageError').textContent = 'Message too short (min 10 characters)';
        valid = false;
    }
    
    if (!valid) return;
    
    const feedback = { name, email, subject, message, date: new Date().toISOString() };
    let all = getData('feedback') || [];
    all.push(feedback);
    saveData('feedback', all);
    
     document.getElementById('feedbackForm').style.display = 'none';
     document.getElementById('confirmBox').style.display = 'block';

}

function resetForm() {
    document.getElementById('feedbackForm').reset();
    document.getElementById('feedbackForm').style.display = 'grid';
    document.getElementById('confirmBox').style.display = 'none';
    document.querySelectorAll('.error').forEach(el => el.textContent = '');
}

function setupFAQ() {
    document.querySelectorAll('.faq-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const item = this.parentElement;
            const wasActive = item.classList.contains('active');
            
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            
            if (!wasActive) {
                item.classList.add('active');
            }
        });
    });
}
