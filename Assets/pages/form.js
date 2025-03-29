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

function signup() {
    let username = document.querySelector(".usernameReg").value;
    let email = document.querySelector(".emailReg").value;
    let password = document.querySelector(".passwordReg").value;

    if (localStorage.getItem(username)) {
        alert("User already exists! Try again using different Username.");
        return;
    }

    localStorage.setItem(username, password);
    alert("Signup successful! Now login.");

    let emailParams = {
        user_email: email,
        user_name: username
    };

    emailjs.send("Eduvernture_ID", "template_vamlc5o", emailParams)
        .then(() => {
            console.log("Email sent successfully!");
        })
        .catch((error) => {
            console.error("Email sending failed!", error);
        });
}
document.querySelector("#reg").addEventListener("click", signup);

function Login(){
    let username = document.querySelector(".usernameLogin").value;
    let password = document.querySelector(".passwordLogin").value;
    if(!localStorage.getItem(username)){
        alert("No user with name "+username+" exist!");
        return;
    }
    let storedPassword = localStorage.getItem(username);
    if (storedPassword === password) {
        localStorage.setItem("loggedInUser", username);
        window.location.pathname = "/index.html";
    } else {
        alert("Invalid username or password!");
    }
}

document.querySelector("#login").addEventListener("click", Login);

function chkPurchase(){
    const purchased = localStorage.getItem("purchasedCourses");
    if(purchased){
        document.getElementById("learning").classList.remove('notvisible');
    }
    else{
        document.getElementById("learning").classList.add('notvisible');
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

