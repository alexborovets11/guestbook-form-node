export default function validateForm(data) {
    
    const errors = [];

    if (!data.firstName || data.firstName.trim() === "") {
        errors.push("First name is required");
    }

    if (!data.lastName || data.lastName.trim() === "") {
        errors.push("Last name is required");
    }

    if (!data.email || data.email.trim() === "" || 
        data.email.indexOf("@") === -1 ||
        data.email.indexOf(".") === -1) {
        errors.push("Email is required and must be valid");
    }

    if (data.jobTitle && data.jobTitle.trim() === "") {
        errors.push("Job title, if provided, must be valid");
    }

    if (data.company && data.company.trim() === "") {
        errors.push("Company, if provided, must be valid");
    }

    if (data.linkedin && !data.linkedin.includes('linkedin.com/in/')) {
        errors.push("LinkedIn URL must contain 'linkedin.com/in/'");
    }

    if (data.meet && data.meet.trim() === "") {
        errors.push("'Meet' field, if provided, must be valid");
    }

 
    if (data.message && data.message.trim() === "") {
        errors.push("Message, if provided, must be valid");
    }

    if (!data.emailFormat) {
        errors.push("Please select an email format (HTML or Text)");
    } else {
        const validEmailFormats = ["HTML", "Text"];
        if (!validEmailFormats.includes(data.emailFormat)) {
            errors.push("Invalid email format selection");
        }
    }

    if (data.mailingList && !["Yes", "No"].includes(data.mailingList)) {
        errors.push("Mailing list option must be Yes or No");
    }

    return {
        isValid: errors.length === 0,
        errors
    }
}