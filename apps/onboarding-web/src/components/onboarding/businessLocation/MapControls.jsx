import {

LocateFixed,

Plus,

Minus

} from "lucide-react";

export default function MapControls(){

    return(

        <div className="space-y-3">

            <button
                className="
                w-12
                h-12
                rounded-xl
                bg-white
                shadow-lg
                flex
                items-center
                justify-center
                "
            >

                <Plus size={18}/>

            </button>

            <button
                className="
                w-12
                h-12
                rounded-xl
                bg-white
                shadow-lg
                flex
                items-center
                justify-center
                "
            >

                <Minus size={18}/>

            </button>

            <button
                className="
                w-12
                h-12
                rounded-xl
                bg-white
                shadow-lg
                flex
                items-center
                justify-center
                "
            >

                <LocateFixed size={18}/>

            </button>

        </div>

    )

}