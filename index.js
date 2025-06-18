async function fetch_users(fetch_type = 'all') {
    const fetch_data = await
        fetch("https://dan-collins-dev.github.io/dummy-data-fetching-repo/data/users.json")
        .then(response => {
                if (!response.ok) {
                    throw new Error("Could not fetch resource.");
                }
                // console.log("Response status:", response.status);
                return response.json();
            });
    
    // If fetch_type is 'all', return all users, otherwise return users with less than 10 years employed
    const user_data = 
        (fetch_type === 'all' 
                ? fetch_data 
                : fetch_data.filter(user => user.yearsEmployed < 10)
        );        
    create_user_cards(user_data);
};


// Function to reset the user cards by not passing any data into the create_user_cards function
function reset_user_cards() {
    create_user_cards([]);
}


// Function to create user cards with the data fetched from the API
function create_user_cards(user_data) {
    // Clear the existing user cards container
    const user_list = document.getElementById('user-list');
    user_list.innerHTML = '';

    // Loop through the user data and create a card for each user
    if (!user_data || user_data.length !== 0) {
        for (user of user_data) {
            var user_card = document.createElement('div');

            user_card.className = 'user-card';
            user_card.innerHTML = `
                <p> ${user.firstName} ${user.lastName}</p>
                <p>${user.email}</p> 
                <p>${user.companyName}</p>
                <p>${user.yearsEmployed} years employed</p>
                `;

            user_list.appendChild(user_card);
        }
    }
}