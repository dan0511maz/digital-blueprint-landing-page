export async function onRequestPost(context) {
    try {
        const { email } = await context.request.json();

        if (!email || !email.includes("@")) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "A valid email address is required."
                }),
                {
                    status: 400,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
        }

        const brevoResponse = await fetch(
            "https://api.brevo.com/v3/contacts",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "api-key": context.env.BREVO_API_KEY
                },
                body: JSON.stringify({
                    email: email,
                    listIds: [
                        Number(context.env.BREVO_LIST_ID)
                    ],
                    updateEnabled: true
                })
            }
        );

        if (!brevoResponse.ok) {
            const brevoError = await brevoResponse.text();

            console.error("Brevo error:", brevoError);

            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Brevo rejected the request.",
                    error: brevoError
                }),
                {
                    status: 502,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
        }

        return new Response(
            JSON.stringify({
                success: true,
                message: "Contact added to Brevo."
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

    } catch (error) {
        console.error("Subscribe function error:", error);

        return new Response(
            JSON.stringify({
                success: false,
                message: "Subscription failed.",
                error: error.message
            }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    }
}