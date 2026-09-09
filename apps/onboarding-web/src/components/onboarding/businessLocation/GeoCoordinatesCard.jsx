import { CheckCircle2 } from "lucide-react";

export default function GeoCoordinatesCard({
    businessData
}) {

    return (

        <div className="rounded-2xl bg-slate-100 p-5">

            <div className="flex items-center justify-between">

                <h3 className="font-semibold">
                    Geo Coordinates
                </h3>

                <CheckCircle2
                    className="text-green-500"
                    size={20}
                />

            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">

                <div>

                    <p className="text-xs uppercase tracking-wider text-slate-500">
                        Latitude
                    </p>

                    <div className="mt-2 bg-white rounded-lg px-3 py-2 font-mono">
                        {businessData?.latitude ?? "-"}
                    </div>

                </div>

                <div>

                    <p className="text-xs uppercase tracking-wider text-slate-500">
                        Longitude
                    </p>

                    <div className="mt-2 bg-white rounded-lg px-3 py-2 font-mono">
                        {businessData?.longitude ?? "-"}
                    </div>

                </div>

            </div>

            <div className="mt-4">

                <p className="text-xs uppercase tracking-wider text-slate-500">
                    Accuracy
                </p>

                <div className="mt-2 bg-white rounded-lg px-3 py-2 font-mono">
                    {businessData?.accuracy ?? "-"}
                </div>

            </div>

        </div>

    );
}