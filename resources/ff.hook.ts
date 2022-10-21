import * as React from 'react';
import { getFeatureState } from './ff';

export function useFF(name: string, defaultValue?: boolean) {
    const [isLoading, setIsLoading] = React.useState(true);
    const [isFFEnabled, setIsFFEnabled] = React.useState(defaultValue);

    const loadFF = React.useCallback(() => {
        setIsLoading(true);
        getFeatureState(name).then(
            value => value != null && setIsFFEnabled(value)
        ).finally(
            () => setIsLoading(false)
        );
    }, [name]);

    React.useEffect(() => {
        loadFF();
    }, [loadFF]);

    // React.useEffect(() => {
    //     const interval = setInterval(loadFF, 1000);
    //     return () => clearInterval(interval);
    // }, [loadFF]);

    return [isFFEnabled, isLoading];
}