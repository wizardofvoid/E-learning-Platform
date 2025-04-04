const navbar = document.querySelector(".navbar");
const menuIcon = document.getElementById("menuIcon");
const login = document.querySelector(".form-box-login");
const register = document.querySelector(".form-box-reg");
const toggleLeft = document.querySelector(".toggle-panel.toggle-left");
const toggleRight = document.querySelector(".toggle-panel.toggle-right");

function toggleL(){
    login.classList.remove("visible");
    login.classList.add("hidden");
    register.classList.remove("hidden");
    register.classList.add("visible");
    toggleLeft.classList.remove("visible");
    toggleLeft.classList.add("hidden");
    toggleRight.classList.remove("hidden");
    toggleRight.classList.add("visible");
}
function toggleR(){
    login.classList.remove("hidden");
    login.classList.add("visible");
    register.classList.remove("visible");
    register.classList.add("hidden");
    toggleLeft.classList.remove("hidden");
    toggleLeft.classList.add("visible");
    toggleRight.classList.remove("visible");
    toggleRight.classList.add("hidden");
}

emailjs.init('87ayksd6HCIjcB81M');
function signup(event) {
    event.preventDefault();

    let username = document.querySelector(".usernameReg").value;
    let email = document.querySelector(".emailReg").value;
    let password = document.querySelector(".passwordReg").value;

    if (localStorage.getItem(username)) {
        alert("User already exists! Try again using different Username.");
        return;
    }

    localStorage.setItem(username, JSON.stringify({
        email: email,
        password: password
    }));
    alert("Signup successful! Now login.");

    if (!email) {
        alert("Please enter a valid email address.");
        return;
    }

    emailjs.send("Eduvernture_ID", "template_vamlc5o", {name: username, email: email})
        .then(() => {
            console.log("Email sent successfully!");
        })
        .catch((error) => {
            console.error("Email sending failed!", error);
            if (error.text.includes("Recipient's address missing")) {
                alert("Please ensure the recipient's email address is correctly configured in your EmailJS template.");
            }
        });
}

document.querySelector(".form-box-reg form").addEventListener("submit", signup);

function Login(event){
    event.preventDefault();
    let username = document.querySelector(".usernameLogin").value;
    let password = document.querySelector(".passwordLogin").value;
    let storedData = localStorage.getItem(username);
    if(!storedData){
        alert("No user with name "+username+" exist!");
        return;
    }
    let userData = JSON.parse(storedData);
    let storedPassword = userData.password;
    let storedEmail = userData.email;
    if (password === storedPassword) {
        localStorage.setItem("loggedInUser", username);
        emailjs.send("Eduvernture_ID", "template_i2omixd", {name: username, email: storedEmail})
        .then(() => {
            console.log("Email sent successfully!");
        })
        .catch((error) => {
            console.error("Email sending failed!", error);
            if (error.text.includes("Recipient's address missing")) {
                alert("Please ensure the recipient's email address is correctly configured in your EmailJS template.");
            }
        });
        alert("Succesfully Logged in!");
    } else {
        alert("Invalid username or password!");
    }
    location.reload();
}

document.querySelector("#login").addEventListener("click", Login);

function chkPurchase(){
    const purchased = localStorage.getItem("purchasedCourses");
    if(purchased){
        document.getElementById("learning").classList.remove('notvisible');
        document.getElementById("logout").classList.add('withcourse');
    }
    else{
        document.getElementById("learning").classList.add('notvisible');
        document.getElementById("logout").classList.add('withoutcourse');
    }
}


const logoutBtn = document.getElementById("logout");

function chkLogin(){
    const logUser = localStorage.getItem("loggedInUser");
    if(logUser){
        chkPurchase();
        document.getElementById("courses").style.display = "block";
        logoutBtn.classList.remove('notvisible');
    }
    else{
        document.getElementById("courses").style.display = "none";
        logoutBtn.classList.add('notvisible');
    }
}
chkLogin();

logoutBtn.addEventListener("click",()=>{
    localStorage.removeItem("loggedInUser");
    location.reload();
})

