import * as React from 'react';
import { useFF } from '../resources/ff.hook';

export const FeedbackDialog: React.FC<{
    className?: string;
}> = React.memo(({ className }) => {
    const [isFFEnabled, isLoadingFF] = useFF("feedback-dialog", true);

    return !isFFEnabled || isLoadingFF ? null : <div className={className}>
        Feedback Dialog Feature
    </div>
});