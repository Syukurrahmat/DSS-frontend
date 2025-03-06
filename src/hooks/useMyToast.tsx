import { useToast, UseToastOptions } from "@chakra-ui/react";

export default function useMyToasts() {
    const toast = useToast();
    return {
        success: (description: string, opt?: Partial<UseToastOptions>) => toast({
            status: 'success',
            title: 'Berhasil',
            description,
            ...opt,
        }),
        error: (description: string, opt?: Partial<UseToastOptions>) => toast({
            status: 'error',
            title: 'Gagal',
            description,
            ...opt,
        }),

        opss: (description: string, opt?: Partial<UseToastOptions>) => toast({
            title: `Opss !!!`,
            status: 'warning',
            description,
            ...opt
        })
    };
}