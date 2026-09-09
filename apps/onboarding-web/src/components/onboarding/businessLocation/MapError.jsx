import { MapPinned } from "lucide-react";

export default function MapError(){

    return(

        <div
            className="
            absolute
            inset-0
            flex
            flex-col
            items-center
            justify-center
            bg-white
            "
        >

            <MapPinned

                size={60}

                className="text-red-500"

            />

            <h2 className="mt-4 text-2xl font-bold">

                Unable to load Map

            </h2>

            <p className="mt-2 text-slate-500">

                Please check your internet connection.

            </p>

        </div>

    )

}