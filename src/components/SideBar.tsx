import { memo } from "react";
import lodash from "lodash";
import { Button } from "./Button";
import { Header } from "./Header";
import { List, ListRowRenderer } from "react-virtualized";

interface Genre {
  id: number;
  title: string;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
}
interface SideBarProps {
  handleClickButton(id: number): void;
  genres: Genre[];
  selectedGenreId: number;
}

export function SideBarComponent({
  genres,
  selectedGenreId,
  handleClickButton,
}: SideBarProps) {
  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <Button
          title={genres[index].title}
          iconName={genres[index].name}
          onClick={() => handleClickButton(genres[index].id)}
          selected={selectedGenreId === genres[index].id}
        />
      </div>
    );
  };
  return (
    <nav className="sidebar">
      <Header />
      <div className="buttons-container">
        <List
          height={900}
          rowHeight={80}
          width={900}
          overscanRowCount={10}
          rowCount={genres.length}
          rowRenderer={rowRenderer}
          
        />
      </div>
    </nav>
  );
}

export const SideBar = memo(SideBarComponent, (prevProps, nextProps) => {
  return lodash.isEqual(prevProps, nextProps);
});
