import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function ActionFooter() {

    const navigate = useNavigate();

    const handleContinue = () => {

        // Later API Call

        navigate("/documents");

    };

    return (

        <div className="px-6 py-5 border-t border-slate-200 bg-white">

            <div className="flex gap-4">

                <button

                    onClick={()=>navigate(-1)}

                    className="
                    flex-1
                    h-12
                    rounded-xl
                    border
                    border-slate-300
                    hover:border-[#006B5F]
                    transition
                    "

                >

                    Back

                </button>

                <motion.button

                    whileHover={{scale:1.02}}

                    whileTap={{scale:0.98}}

                    onClick={handleContinue}

                    className="
                    flex-[2]
                    h-12
                    rounded-xl
                    text-white
                    font-semibold
                    bg-gradient-to-r
                    from-[#0EA5A4]
                    to-[#2563EB]
                    shadow-lg
                    "

                >

                    Confirm & Continue

                </motion.button>

            </div>

        </div>

    )

}