document.addEventListener('DOMContentLoaded', () => {
    fetchMentors();

    const editProfileBtn = document.getElementById('editProfileBtn');
    editProfileBtn.addEventListener('click', editProfile);
});

async function fetchMentors() {
    try {
        const response = await fetch('/api/users/mentors');
        const mentors = await response.json();

        const mentorList = document.querySelector('.mentor-list');
        mentorList.innerHTML = '';

        mentors.forEach(mentor => {
            const mentorCard = document.createElement('div');
            mentorCard.classList.add('mentor-card');
            mentorCard.innerHTML = `
                <h3>${mentor.name}</h3>
                <p><strong>Expertise:</strong> ${mentor.expertise}</p>
                <button class="connectBtn" data-id="${mentor._id}">Connect</button>
            `;
            mentorList.appendChild(mentorCard);
        });

        document.querySelectorAll('.connectBtn').forEach(button => {
            button.addEventListener('click', connectWithMentor);
        });

    } catch (error) {
        console.error('Error fetching mentors:', error);
    }
}

async function connectWithMentor(event) {
    const mentorId = event.target.getAttribute('data-id');
    const studentId = 'YOUR_STUDENT_ID'; // Replace with actual student ID

    try {
        const response = await fetch('/api/users/connect', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ studentId, mentorId }),
        });

        if (response.ok) {
            const updatedStudent = await response.json();
            alert('Successfully connected with the mentor!');
            event.target.textContent = 'Connected';
            event.target.disabled = true;
        } else {
            alert('Failed to connect with mentor.');
        }
    } catch (error) {
        console.error('Error connecting with mentor:', error);
    }
}

function editProfile() {
    alert('Profile editing functionality coming soon!');
}
