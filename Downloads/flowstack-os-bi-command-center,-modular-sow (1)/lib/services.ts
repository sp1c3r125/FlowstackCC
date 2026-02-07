import { WEBHOOK_URL } from './constants';

export const flowstackService = {
    async submitForm(data: any) {
        try {
            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                    source: 'flowstack_os_web',
                    timestamp: new Date().toISOString(),
                }),
            });

            if (!response.ok) {
                throw new Error(`Submission failed with status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Service Error:", error);
            throw error;
        }
    }
};
