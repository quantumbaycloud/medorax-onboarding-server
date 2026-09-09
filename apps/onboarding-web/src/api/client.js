import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

console.log("🔥 VITE_API_URL =", BASE_URL);
console.log("🔥 BASE_URL =", BASE_URL);

const client = axios.create({
    baseURL: BASE_URL,

    headers: {
        Accept: "application/json",
    },

    timeout: 30000,

    withCredentials: true,
});


/**
 * REQUEST INTERCEPTOR
 */
client.interceptors.request.use(
    (config) => {
        const isFormData =
            typeof FormData !== "undefined" &&
            config.data instanceof FormData;

        if (isFormData) {
            /**
             * VERY IMPORTANT
             *
             * Do NOT send:
             * Content-Type: application/json
             *
             * Also do NOT manually set:
             * multipart/form-data
             *
             * The browser/Axios will automatically generate:
             *
             * multipart/form-data; boundary=----
             */

            if (config.headers) {
                delete config.headers["Content-Type"];
                delete config.headers["content-type"];
            }

            console.log(
                "📦 FormData request detected"
            );

            console.log(
                "📦 URL:",
                config.url
            );

            console.log(
                "📦 documentType:",
                config.data.get("documentType")
            );

            const uploadedFile =
                config.data.get("file");

            console.log(
                "📦 file:",
                uploadedFile
                    ? {
                          name: uploadedFile.name,
                          size: uploadedFile.size,
                          type: uploadedFile.type,
                      }
                    : null
            );
        } else {
            /**
             * Normal JSON request.
             */
            config.headers = {
                ...(config.headers || {}),
                "Content-Type":
                    "application/json",
            };

            console.log(
                `🚀 ${config.method?.toUpperCase()} ${config.url}`
            );

            console.log(
                "🚀 JSON data:",
                config.data
            );
        }

        return config;
    },

    (error) => {
        console.error(
            "❌ Request interceptor error:",
            error
        );

        return Promise.reject(error);
    }
);


/**
 * Convert backend/FastAPI errors into a STRING.
 *
 * This is important because React cannot render:
 *
 * { type, loc, msg, input }
 *
 * directly.
 */
export function getApiErrorMessage(
    error,
    fallback = "Something went wrong. Please try again."
) {
    const responseData =
        error?.response?.data;

    if (!responseData) {
        return (
            error?.message ||
            fallback
        );
    }

    const detail =
        responseData?.detail;


    /**
     * FastAPI validation error.
     *
     * Example:
     *
     * [
     *   {
     *      type: "missing",
     *      loc: ["body", "file"],
     *      msg: "Field required",
     *      input: null
     *   }
     * ]
     */
    if (Array.isArray(detail)) {
        const messages = detail
            .map((item) => {
                if (
                    typeof item ===
                    "string"
                ) {
                    return item;
                }

                if (
                    item &&
                    typeof item ===
                        "object"
                ) {
                    if (
                        typeof item.msg ===
                        "string"
                    ) {
                        return item.msg;
                    }

                    if (
                        typeof item.message ===
                        "string"
                    ) {
                        return item.message;
                    }
                }

                return null;
            })
            .filter(Boolean);

        if (messages.length) {
            return messages.join(", ");
        }
    }


    /**
     * Normal backend error.
     */
    if (
        typeof detail ===
        "string"
    ) {
        return detail;
    }


    if (
        typeof responseData.message ===
        "string"
    ) {
        return responseData.message;
    }


    return fallback;
}


/**
 * RESPONSE INTERCEPTOR
 */
client.interceptors.response.use(
    (response) => {
        console.log(
            `✅ Response from ${response.config.url}:`,
            response.status
        );

        return response;
    },

    (error) => {
        if (error.response) {
            console.error(
                `❌ Server Error ${error.response.status}:`,
                error.response.data
            );

            console.error(
                "URL:",
                error.config?.url
            );

            console.error(
                "Method:",
                error.config?.method
            );


            /**
             * IMPORTANT:
             *
             * Do not stringify FormData itself.
             */
            if (
                error.config?.data instanceof
                FormData
            ) {
                console.error(
                    "Data sent: FormData"
                );

                console.error(
                    "documentType:",
                    error.config.data.get(
                        "documentType"
                    )
                );

                const file =
                    error.config.data.get(
                        "file"
                    );

                console.error(
                    "file:",
                    file
                        ? {
                              name:
                                  file.name,
                              size:
                                  file.size,
                              type:
                                  file.type,
                          }
                        : null
                );
            } else {
                console.error(
                    "Data sent:",
                    error.config?.data
                );
            }
        } else if (
            error.request
        ) {
            console.error(
                "❌ No response from server:",
                error.request
            );

            console.error(
                "Base URL:",
                BASE_URL
            );

            console.error(
                "Full URL:",
                error.config?.url
            );
        } else {
            console.error(
                "❌ Request setup error:",
                error.message
            );
        }

        return Promise.reject(error);
    }
);


export default client;