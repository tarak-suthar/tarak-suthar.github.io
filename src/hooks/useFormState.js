import { useState } from "react";

export default function useFormState(initialState = null, callbackAction) {
    const [state, setState] = useState(initialState);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    const formAction = async (e) => {
        e.preventDefault();
        setIsPending(true);
        setError(false);
        const formData = Object.fromEntries(new FormData(e.target).entries());
        try {
            const result = await callbackAction(formData);
            setState(result);
        } catch (error) {
            setError(error.message ?? "something went wrong!");
        } finally {
            setIsPending(false);
        }
    }

    return { state, isPending, formAction, error };
}