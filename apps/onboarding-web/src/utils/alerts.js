import Swal from "sweetalert2";

export const successAlert = (title, text) => {
    return Swal.fire({
        icon: "success",

        title,

        text,

        width: 460,

        background: "#ffffff",

        color: "#0f172a",

        confirmButtonText: "Continue",

        confirmButtonColor: "#0EA5A4",

        timer: 2500,

        timerProgressBar: true,

        showClass: {
            popup: "animate__animated animate__zoomIn"
        },

        hideClass: {
            popup: "animate__animated animate__zoomOut"
        }
    });
};

export const errorAlert = (title, text) => {
    return Swal.fire({
        icon: "error",

        title,

        text,

        width: 460,

        background: "#ffffff",

        color: "#0f172a",

        confirmButtonColor: "#ef4444"
    });
};

export const warningAlert = (title, text) => {
    return Swal.fire({
        icon: "warning",

        title,

        text,

        width: 460,

        confirmButtonColor: "#f59e0b"
    });
};