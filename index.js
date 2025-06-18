async function fetch_users() {
    const data =
        fetch("https://dan-collins-dev.github.io/dummy-data-fetching-repo/data/users.json")
        .then(response => {
                if (!response.ok) {
                    throw new Error("Could not fetch resource.");
                }
                // console.log("Response status:", response.status);
                return response.json();
            });
    return data;
};


// Function to fetch all users and display them in user cards on the page
async function get_all_users() {
    try {
        const users_all = await fetch_users();
        create_user_cards(users_all);
    }
    catch (error) {
        const error_message = document.getElementById('error-message');
        error_message.innerHTML = `"Error fetching user data: ", error`;
        throw error;
    }
}


// Function to fetch all users, filter for those with less than 10 years employed
//  and display them in user cards on the page
async function get_under_10_years() {
    try {
        const users_all = await fetch_users();
        const users_under_10 = users_all.filter(user => user.yearsEmployed < 2);
        create_user_cards(users_under_10);
    }
    catch (error) {
        const error_message = document.getElementById('error-message');
        error_message.innerHTML = `"Error fetching user data: ", error`;
        throw error;
    }
}


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