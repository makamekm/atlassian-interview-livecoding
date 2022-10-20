import * as React from 'react';
import { ListTree } from './ListTree';

import { DataItem } from './types';

export const ListTreeItem: React.FC<{
    item: DataItem;
}> = React.memo(({ item }) => {
    const btn = React.useRef<HTMLDivElement>();
    const [isOpened, setIsOpened] = React.useState<boolean>(() => !!item.isOpened);
    
    const toggle = React.useCallback(() => {
        setIsOpened(!isOpened);
    }, [isOpened]);
    
    const toggleOnEnter = React.useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
        e.keyCode === 13 && toggle();
    }, [toggle]);

    const hasChildren = item.children?.length;

    React.useEffect(() => {
        item.isActive && btn.current?.focus();
    }, [btn, item.isActive]);

    return <div>
        <div
            ref={btn}
            tabIndex={0}
            className={`item space-x-5 ${item.isActive && 'active'}`}
            onKeyDown={toggleOnEnter}
            onClick={toggle}>
            {!hasChildren && <span>•</span>}
            {hasChildren && isOpened && <span>▼</span>}
            {hasChildren && !isOpened && <span>▶</span>}
            <span>{item.name}</span>
        </div>
        {isOpened && hasChildren && <ListTree className='item-tree' data={item.children} />}
    </div>
});