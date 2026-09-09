import { MapPin } from "lucide-react";

export default function FloatingMapPin(){

    return(

        <div
            className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            pointer-events-none
            "
        >

            <div className="relative flex flex-col items-center">

                <div
                    className="
                    absolute
                    w-14
                    h-14
                    rounded-full
                    bg-[#006B5F]
                    animate-ping
                    opacity-30
                    "
                />

                <div
                    className="
                    relative
                    w-16
                    h-16
                    rounded-full
                    bg-gradient-to-r
                    from-[#0EA5A4]
                    to-[#2563EB]
                    shadow-2xl
                    flex
                    items-center
                    justify-center
                    "
                >

                    <MapPin

                        size={34}

                        className="text-white"

                        fill="white"

                    />

                </div>

                <div
                    className="
                    mt-4
                    rounded-full
                    bg-white
                    shadow-lg
                    px-5
                    py-2
                    text-xs
                    tracking-[3px]
                    font-bold
                    text-[#006B5F]
                    "
                >

                    DRAG TO SET LOCATION

                </div>

            </div>

        </div>

    )

}