export default function SongDisplay({ song }) {
  const { title, instrument, artist, pdf } = song;

  return (
    <a href={pdf} target="_blank">
      <div className="flex border border-primary70 bg-tertiary97 dark:bg-secondary20 shadow-customXl dark:shadow-none rounded-xl w-full p-4 m-1 hover:bg-primary90 dark:hover:bg-secondary10 hover:text-white hover:shadow-none duration-100">
        <div className="text-primary10 w-full dark:text-primary90">
          <p>
            Title: <b>{title}</b>
          </p>
          <div className="flex justify-between">
            <span>
              Artist: <b>{artist}</b>
            </span>
            <span>{instrument}</span>
          </div>
        </div>
      </div>
    </a>
  );
}
