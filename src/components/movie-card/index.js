import Image from "next/image";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const MovieCard = ({ title, year, image, onEdit, onRemove }) => {
  return (
    <div className="bg-[#092C39] border-0 rounded-lg shadow-md overflow-hidden">
      <div className="p-2">
        <div className="aspect-[3/4] relative overflow-hidden rounded-lg">
          {image && (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform hover:scale-105"
              priority
            />
          )}
        </div>
      </div>
      <div className="flex  items-start p-4">
        <div className="flex-1">
          <h3 className="font-medium text-white">{title}</h3>
          <p className="text-sm text-gray-400">{year}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="px-2 py-1 text-sm text-white rounded-md hover:bg-blue-600"
          >
            <MdEdit size={20} />
          </button>
          <button
            onClick={onRemove}
            className="px-2 py-1 text-sm text-white rounded-md hover:bg-red-600"
          >
            <MdDelete size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
