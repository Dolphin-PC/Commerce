import { jsx as _jsx } from "react/jsx-runtime";
import { FixedSizeGrid, FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import InfiniteLoader from "react-window-infinite-loader";
const GUTTER_SIZE = 10;
// FixedSizeGrid와 InfiniteLoader 의 호환성 문제로 인해, InfiniteLoader 미사용처리
// @see https://github.com/bvaughn/react-window/issues/613
export const GridWindowLayout = ({ childrens, fetchNextPage, hasNextPage, isNextPageLoading, columnCount, rowHeight }) => {
    // const itemCount = hasNextPage ? childrens.length + 1 : childrens.length; // 무한 스크롤을 위해 아이템 개수를 늘려줍니다.
    const itemCount = childrens.length + 1; // 무한 스크롤을 위해 아이템 개수를 늘려줍니다.
    const loadMoreItems = isNextPageLoading ? () => { } : fetchNextPage;
    const isItemLoaded = (index) => !hasNextPage || index < childrens.length;
    const Item = ({ columnIndex, rowIndex, style }) => {
        const index = rowIndex * columnCount + columnIndex;
        let content;
        if (!isItemLoaded(index)) {
            content = "Loading...";
        }
        else {
            content = childrens[index];
        }
        return (_jsx("div", { style: {
                ...style,
                left: style.left + GUTTER_SIZE,
                top: style.top + GUTTER_SIZE,
                width: style.width - GUTTER_SIZE,
                height: style.height - GUTTER_SIZE,
            }, children: content }));
    };
    return (_jsx(AutoSizer, { children: ({ height, width }) => (_jsx(InfiniteLoader, { isItemLoaded: isItemLoaded, itemCount: itemCount, loadMoreItems: loadMoreItems, children: ({ onItemsRendered, ref }) => {
                // onItemsRendered는 Grid가 아닌 List를 사용하면 <List onItemsRendered={onItemsRendered} />이렇게 넘겨주면 됩니다.
                // 그러나 Grid를 사용하면 리스트의 바닥에 스크롤이 도달해도 자동으로 onItemsRendered가 실행 되지 않습니다. 그래서 아래처럼 임의 함수를 만들어서 <Grid onItemsRendered={newItemsRendered} /> 형태로 넘깁니다.
                const newItemsRendered = (gridData) => {
                    const { visibleRowStopIndex, // 현재 브라우저에 보여지는 list의 마지막 index
                    overscanRowStartIndex, // 보이는 화면 너머 위쪽에 미리 렌더링할 row의 시작 index
                    overscanRowStopIndex, // 보이는 화면 너머 아래쪽에 미리 렌더링할 row의 마지막 index
                    overscanColumnStopIndex, // 보이는 화면 너머 오른쪽에 미리 렌더링할 column의 마지막 index
                     } = gridData;
                    const visibleStartIndex = overscanRowStartIndex * overscanColumnStopIndex;
                    const visibleStopIndex = overscanRowStopIndex * overscanColumnStopIndex;
                    // 현재 브라우저에 보여지는 list가 맨 바닥이면 onItemsRendered를 실행한다.
                    if (visibleRowStopIndex >= childrens.length / columnCount - 1) {
                        onItemsRendered({ visibleStartIndex, visibleStopIndex, overscanStartIndex: 0, overscanStopIndex: 0 });
                    }
                };
                return (_jsx(FixedSizeGrid, { height: height, width: width, itemData: childrens, columnCount: columnCount, columnWidth: (width - GUTTER_SIZE) / columnCount, rowCount: Math.ceil(childrens.length / columnCount), rowHeight: rowHeight, onItemsRendered: newItemsRendered, ref: ref, className: "scrollbar-hide", children: Item }));
            } })) }));
};
export const ListWindowLayout = ({ hasNextPage, isNextPageLoading, fetchNextPage, childrens, itemHeight }) => {
    const itemCount = hasNextPage ? childrens.length + 1 : childrens.length;
    const loadMoreItems = isNextPageLoading ? () => { } : fetchNextPage;
    const isItemLoaded = (index) => !hasNextPage || index < childrens.length;
    // Render an item or a loading indicator.
    const Item = ({ index, style }) => {
        let content;
        if (!isItemLoaded(index)) {
            content = "Loading...";
        }
        else {
            content = childrens[index];
        }
        return _jsx("div", { style: style, children: content });
    };
    return (_jsx(AutoSizer, { children: ({ height, width }) => {
            return (_jsx(InfiniteLoader, { isItemLoaded: isItemLoaded, itemCount: itemCount, loadMoreItems: loadMoreItems, children: ({ onItemsRendered, ref }) => (_jsx(FixedSizeList, { itemSize: itemHeight, itemCount: itemCount, onItemsRendered: onItemsRendered, ref: ref, width: width, height: height, className: "scrollbar-hide", children: Item })) }));
        } }));
};
