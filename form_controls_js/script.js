"use strict";


// Required
//---
const arr_required = document.querySelectorAll('[required]');

// Remoter sur son élément parent
for (const item of arr_required)
{
    let parent;
    let label;

    // Cibler l'élément frere
    if (item.nodeName === 'INPUT')
    {
        parent = item.parentNode;
    }
    else if (item.nodeName === 'SELECT')
    {
        parent = item.parentNode.parentNode.parentNode;
    }

    if (parent.nodeName === 'DIV')
    {
        label = parent.querySelector('label');
    }
    else
    {
        label = parent;
    }

    // Injecter la class "required" sur "label"
    label.classList.add('required');
}




// Générer les listes de selections du champ "Birthdate"
// --


const months = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "aout",
    "septembre",
    "octobre",
    "novembre",
    "décembre"
];
let monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];


// Liste des jours
const select_day = document.querySelector('[name="birthdate[day]"]');

for (let i=1; i<=31; i++)
{
    let el_option = document.createElement('option');
        el_option.value = i;
        el_option.innerText = i<=9 ? `0${i}` : i;

    select_day.append( el_option );
}


// Liste des mois
const select_month = document.querySelector('[name="birthdate[month]"]');

for (let i=0; i<months.length; i++)
{
    let el_option = document.createElement('option');
        el_option.value = (i+1);
        el_option.innerText = months[i];

    select_month.append( el_option );
}


// Liste des années
const select_year = document.querySelector('[name="birthdate[year]"]');

const date = new Date();
const year = date.getFullYear();
const minYear = year-100;

for (let i=year; i>=minYear; i--)
{
    let el_option = document.createElement('option');
        el_option.value = i;
        el_option.innerText = i;

    select_year.append( el_option );
}





// Controle du formulaire
// --

const form = document.querySelector('form');
const el_firstname = document.querySelector('input[name=firstname]');
const el_lastname = document.querySelector('input[name=lastname]');
const el_email = document.querySelector('input[name=email]');
const el_password = document.querySelector('input[name=password]');
const el_confirm_password = document.querySelector('input[name=confirmpwd]');
const el_agreeTerms = document.querySelector('input[name=agreeTerms]');
const el_birthdate_day = document.querySelector('select[name="birthdate[day]"]');
const el_birthdate_month = document.querySelector('select[name="birthdate[month]"]');
const el_birthdate_year = document.querySelector('select[name="birthdate[year]"]');


/**
 * Show an error message
 * 
 * @param {ElementNode} target 
 * @param {string} message 
 * @return void
 */
function showError(target, message)
{
    let el_error = document.createElement('div');
        el_error.classList.add('error');
        el_error.innerText = message;

    target.classList.add('is-invalid');
    target.parentNode.append(el_error);
}

/**
 * Remove all error message
 * 
 * @return void
 */
function removeError()
{
    console.log('REMOVE IS-INVALID');
    const isInvalid = document.querySelectorAll('.is-invalid');

    for (const item of isInvalid)
    {
        item.classList.remove('is-invalid');
    }


    console.log('REMOVE ERROR');
    const errors = document.querySelectorAll('.error');

    for (const item of errors)
    {
        item.remove();
    }
}

/**
 * Check the firstname constraints
 * 
 * @returns {bool} true if firstname is valid
 */
function checkFirstname()
{
    // Check firstname
    let firstname = el_firstname.value;
    let error = false;

    // firstname is required
    if (!firstname.length)
    {
        showError(el_firstname, "Le prénom est requis.");
        error = true;
    }
    else if (!/^[a-z][a-z-]*[a-z]?$/i.test(firstname))
    {
        showError(el_firstname, "Le prénom doit contenir uniquement des caractères alphabétiques.");
        error = true;
    }

    return error;
}

/**
 * Check the lastname constraints
 * 
 * @returns {bool} true if firstname is valid
 */
function checkLastname()
{
    // Check lastname
    let lastname = el_lastname.value;
    let error = false;
    let re = new RegExp(/^[a-z][a-z-\s]*[a-z]?$/, "i");

    // lastname is required
    if (!lastname.length)
    {
        showError(el_lastname, "Le nom est requis.");
        error = true;
    }
    else if (!re.test(lastname))
    {
        showError(el_lastname, "Le nom doit contenir uniquement des caractères alphabétiques.");
        error = true;
    }

    return error;
}

function checkEmail()
{
    let email = el_email.value;
    let error = false;
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email.length)
    {
        showError(el_email, "L'email est requis.");
        error = true;
    }
    else if (!re.test(email))
    {
        showError(el_email, "Le format d'adresse email n'est pas valide.");
        error = true;
    }

    return error;
}

function checkPassword()
{
    let password = el_password.value;
    let error = false;
    let minChar = 8;
    let maxChar = 16;
    let specialChar = "+=!-_§";
    let re_specialChar = new RegExp(`/[${specialChar}]/`, "g");

    // - required
    if (!password.length)
    {
        showError(el_password, "Le mot de passe est requis.");
        error = true;
    }

    // - longueur min 8 caractères
    else if (password.length < minChar)
    {
        showError(el_password, `Le mot de passe doit contenir au minimum ${minChar} caractères.`);
        error = true;
    }

    // - longueur max 16 caractères
    else if (password.length > maxChar)
    {
        showError(el_password, `Le mot de passe doit contenir au maximum ${maxChar} caractères.`);
        error = true;
    }

    // - au moins un caractère alphabetique
    else if (!/[a-z]/.test(password))
    {
        showError(el_password, `Le mot de passe doit contenir au moins un caractère alphabétique.`);
        error = true;
    }

    // - au moins une Majuscule
    else if (!/[A-Z]/.test(password))
    {
        showError(el_password, `Le mot de passe doit contenir au moins une majuscule.`);
        error = true;
    }

    // - au moins un caractère numerique
    else if (!/[0-9]/.test(password))
    {
        showError(el_password, `Le mot de passe doit contenir au moins un chiffre.`);
        error = true;
    }

    return error;
}

function confirmPassword()
{
    let password = el_password.value;
    let confirmation = el_confirm_password.value;
    let error = false;

    if (confirmation !== password)
    {
        showError(el_confirm_password, `Les mots de passe doivent être identiques.`);
        error = true;
    }

    return error;
}

function checkBirthdate()
{
    // Recupération des valeurs des champs (type string)
    let day = el_birthdate_day.value;
    let month = el_birthdate_month.value;
    let year = el_birthdate_year.value;
    let error = false;

    // Convertion des valeur "string" en "number"
    day = parseInt(day);
    month = parseInt(month);
    year = parseInt(year);

    let date_str = month <= 9 ? `0${month}` : month;
        date_str+= "/";
        date_str+= day <= 9 ? `0${day}` : day;
        date_str+= "/";
        date_str+= year;

    // - doit etre une date valide dans le passé
    if (!isValidDate(day, month, year))
    {
        showError(el_birthdate_day.parentNode.parentNode, `Selectionnez une date valide.`);
        error = true;
    }

    // - age minimum 13
    else if (getAge(date_str) < 13)
    {
        showError(el_birthdate_day.parentNode.parentNode, `Les moins de 13 ans ne sont pas autorisés à créer un compte.`);
        error = true;
    }

    return error;
}

function isValidDate(day, month, year)
{
    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month == 0 || month > 12)
        return false;

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
}

function getAge(birthdate_str) 
{
    let today = new Date();
    let birth_date = new Date(birthdate_str);
    let age = today.getFullYear() - birth_date.getFullYear();
    let m = today.getMonth() - birth_date.getMonth();

    if ( m < 0 || ( m === 0 && today.getDate() < birth_date.getDate() )) 
    {
        age--;
    }
    
    return age;
}

function checkTerms()
{
    let agreeTerms = el_agreeTerms.checked;
    let error = false;

    if (!agreeTerms)
    {
        showError(el_agreeTerms, `Veuillez accepter les CGU avant de poursuivre.`);
        error = true;
    }
    
    return error;
}

form.addEventListener('submit', event => {
    
    let error = false;

    removeError();

    // Check firstname
    if (checkFirstname())
    {
        error = true;
    }
    
    // Check Lastname
    if (checkLastname())
    {
        error = true;
    }

    // Check Email
    if (checkEmail())
    {
        error = true;
    }

    // Check Password
    if (checkPassword())
    {
        error = true;
    }

    // Confirm Password
    if (confirmPassword())
    {
        error = true;
    }

    // Check Birthdate
    if (checkBirthdate())
    {
        error = true;
    }

    // Check Terms
    if (checkTerms())
    {
        error = true;
    }



    if (error)
    {
        event.preventDefault();
    }
});

// el_firstname.addEventListener('blur', checkFirstname);
// el_lastname.addEventListener('blur', checkLastname);
// el_email.addEventListener('blur', checkEmail);
// el_password.addEventListener('blur', checkPassword);
// el_confirm_password.addEventListener('blur', confirmPassword);
el_birthdate_day.addEventListener('change', checkBirthdate);
el_birthdate_month.addEventListener('change', checkBirthdate);
el_birthdate_year.addEventListener('change', checkBirthdate);