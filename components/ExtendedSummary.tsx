import * as React from 'react';
import { useFF } from '../resources/ff.hook';

export const ExtendedSummary: React.FC<{
    className?: string;
}> = React.memo(({ className }) => {
    const [isFFEnabled, isLoadingFF] = useFF("extended-summary", true);

    return !isFFEnabled || isLoadingFF ? null : <div className={className}>
        Extended Summary Feature
    </div>
});