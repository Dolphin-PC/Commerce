import { FixedSizeGrid, FixedSizeList, VariableSizeGrid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import InfiniteLoader from "react-window-infinite-loader";
import { UseSuspenseInfiniteQueryResult } from "@tanstack/react-query";

interface GridWindowLayoutProps {
  childrens: React.ReactNode[];
  query: UseSuspenseInfiniteQueryResult;
  infiniteCallback: () => void;
}

export const GridWindowLayout = ({ childrens, query, infiniteCallback }: GridWindowLayoutProps) => {
  const isItemLoaded = (index: number) => {
    return true;
  };

  return (
    <AutoSizer>
      {({ height, width }) => {
        return (
          <InfiniteLoader isItemLoaded={isItemLoaded} itemCount={childrens.length} loadMoreItems={infiniteCallback}>
            {({ onItemsRendered, ref }) => {
              return (
                <FixedSizeGrid
                  width={width}
                  height={height}
                  columnCount={4} // 1열에 나타낼 아이템 수
                  columnWidth={width / 4} // 1칸 너비
                  rowCount={Math.ceil(childrens.length / 3)} // 총 줄 수
                  rowHeight={height} // 1줄 높이
                  ref={ref}
                >
                  {({ rowIndex, columnIndex, style }) => {
                    const index = rowIndex * 4 + columnIndex;
                    return <div style={style}>{childrens[index]}</div>;
                  }}
                </FixedSizeGrid>
              );
            }}
          </InfiniteLoader>
        );
      }}
    </AutoSizer>
  );
};

export const ListWindowLayout = ({ childrens, query, infiniteCallback }: GridWindowLayoutProps) => {
  const isItemLoaded = (index: number) => {
    console.log("isItemLoaded", index);
    return !!childrens[index];
  };

  const loadMoreItems = (startIndex: number, endIndex: number) => {
    console.log("loadMoreItems", startIndex, endIndex);
  };

  return (
    <AutoSizer>
      {({ height, width }) => {
        return (
          <InfiniteLoader
            isItemLoaded={isItemLoaded} // 아이템이 로드되었는지 여부
            loadMoreItems={loadMoreItems} // 아이템을 로드하는 함수
            itemCount={childrens.length}
          >
            {({ onItemsRendered, ref }) => {
              return (
                <FixedSizeList width={width} height={300} itemSize={100} itemCount={childrens.length} onItemsRendered={onItemsRendered} ref={ref}>
                  {({ index, style }) => {
                    return <div style={style}>{childrens[index]}</div>;
                  }}
                </FixedSizeList>
              );
            }}
          </InfiniteLoader>
        );
      }}
    </AutoSizer>
  );
};
