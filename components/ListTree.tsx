import * as React from 'react';
import { ListTreeItem } from './ListTreeItem';
import { DataItem } from './types';

export const ListTree: React.FC<{
    data: DataItem[];
    className?: string;
}> = React.memo(({ data, className }) => {

    const renderList = React.useMemo(() => {
        return data?.map(item => {
            return <ListTreeItem key={item.id} item={item}/>
        })
    }, [data]);

    return <div className={className}>
        {renderList}
    </div>
});