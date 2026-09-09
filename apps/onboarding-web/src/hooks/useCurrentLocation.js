import { useState } from "react";

export default function useCurrentLocation(){

    const [loading,setLoading]=useState(false);

    const [error,setError]=useState("");

    const getCurrentLocation=()=>{

        setLoading(true);

        navigator.geolocation.getCurrentPosition(

            (position)=>{

                setLoading(false);

            },

            ()=>{

                setLoading(false);

                setError("Unable to fetch location");

            }

        );

    }

    return{

        loading,

        error,

        getCurrentLocation

    }

}