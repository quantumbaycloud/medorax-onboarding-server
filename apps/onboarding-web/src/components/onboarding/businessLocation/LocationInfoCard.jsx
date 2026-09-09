import { Info } from "lucide-react";

export default function LocationInfoCard(){

    return(

        <div
            className="
            border-t
            border-slate-200
            bg-slate-50
            px-6
            py-5
            "
        >

            <div className="flex gap-3">

                <div
                    className="
                    w-10
                    h-10
                    rounded-full
                    bg-teal-100
                    flex
                    items-center
                    justify-center
                    "
                >

                    <Info

                        size={18}

                        className="text-[#006B5F]"

                    />

                </div>

                <div>

                    <h3 className="font-semibold">

                        Why is location important?

                    </h3>

                    <p className="text-sm leading-6 text-slate-500 mt-1">

                        Your exact location helps us enable
                        delivery routing, warehouse visibility,
                        logistics optimization and emergency support.

                    </p>

                </div>

            </div>

        </div>

    )

}