import React, {
  DOMAttributes,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";

import Error from "./components/Error";
import { selectGenreListId } from "../../redux/features/playerSlice";
import { useGetSongsByGenreQuery } from "../../redux/services/shazamCore";
import { genres } from "../../assets/constants";
import Loader from "./components/Loader";
import SongCard from "./components/SongCard";
import { Button, Container, Input, Modal, Row, Text } from "@nextui-org/react";
import copy from "copy-to-clipboard";
import { useUser } from "@clerk/nextjs";
import ChatBody from "./ChatBody";
interface Props {
  socket: any;
}
const Discover = ({ socket }: Props) => {
  const [room, setRoom] = useState("");
  const [roomCreated, setRoomCreated] = useState(false);
  const [roomUsers, setRoomUsers] = useState("");
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  function generateString(length: number) {
    let result = " ";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  const random = generateString(13);
  const { isLoaded, isSignedIn, user } = useUser();
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [copyText, setCopyText] = useState("");
  const [roomId, setRoomId] = useState("");
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  console.log(room);

  const createRoom = () => {
    setRoom(random);
    socket.emit("createRoom", random);
    setRoomCreated(true);
  };

  useEffect(() => {
    // Event listener to check if the room was successfully created or joined
    socket.on("roomStatus", (status: any) => {
      setRoomCreated(status);
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("roomStatus");
    };
  }, []);

  const copyToClipboard = (room: string) => {
    copy(room);
    alert(`You have copied "${room}"`);
  };

  useEffect(() => {
    // @ts-ignore
    socket.on("messageResponse", (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
  };
  const closeHandler2 = () => {
    setVisible2(false);
  };
  const joinRoom = () => {
    socket.emit("joinRoom", roomId);
    setRoom(roomId);
    setRoomCreated(true);
    // Joining the room will automatically hide the "Create Session" section
  };

  const dispatch = useDispatch();
  const { genreListId } = useSelector((state: any) => state.player);
  const { activeSong, isPlaying } = useSelector((state: any) => state.player);
  const [currentSong, setCurrentSong] = useState();
  useEffect(() => {
    socket.emit("songStuff", activeSong);
    socket.on("activeSongData", (songData: any) => {
      console.log("i recieved ", songData);
      setCurrentSong(songData);
    });
  }, [activeSong]);
  console.log("current song", currentSong);
  const { data, isFetching, error } = useGetSongsByGenreQuery(
    genreListId || "556054389"
  );

  if (isFetching) return <Loader title="Loading songs..." />;

  if (error) return <Error />;

  const genreTitle = genres.find(
    ({ value }: any) => value === genreListId
  )?.title;

  // console.log(genreTitle);

  const newdata = data.tracks;
  const play = "opacity-100 transition-all duration-300";

  return (
    <div className="w-full flex flex-col overflow-hidden overflow-x-hidden">
      <div className="w-3/4 flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          Discover {genreTitle}
        </h2>
        <div>
          <button
            onClick={!roomCreated ? createRoom : handler}
            className="px-4 py-2 ml-2 bg-blue-500 rounded-lg text-white font-semibold hover:bg-blue-600"
          >
            {roomCreated ? <div>Invite People</div> : <p>Create Session</p>}
          </button>
          <Modal
            closeButton
            aria-labelledby="modal-title"
            open={visible}
            onClose={closeHandler}
          >
            <Modal.Header>
              <Text id="modal-title" size={18}>
                Invite Others using this{" "}
                <Text b size={18}>
                  Link
                </Text>
              </Text>
            </Modal.Header>
            <Modal.Body>
              <Input
                bordered
                fullWidth
                color="primary"
                size="lg"
                value={room}
              />
              <Button onPress={() => copyToClipboard(room)}>
                Copy to Clipboard
              </Button>
              <Container></Container>
            </Modal.Body>
            <Modal.Footer>
              <Button auto flat color="error" onPress={closeHandler}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <div>
          <button
            onClick={() => setVisible2(true)}
            className="px-4 py-2 ml-2 bg-blue-500 rounded-lg text-white font-semibold hover:bg-blue-600"
          >
            <p>Join a Session</p>
          </button>
          <Modal
            closeButton
            aria-labelledby="modal-title"
            open={visible2}
            onClose={closeHandler2}
          >
            <Modal.Header>
              <Text id="modal-title" size={18}>
                Enter{" "}
                <Text b size={18}>
                  Room Id
                </Text>
              </Text>
            </Modal.Header>
            <Modal.Body>
              <Input
                bordered
                fullWidth
                color="primary"
                size="lg"
                placeholder="For example SWUYHpe3uRLz9"
                onChange={(e) => setRoomId(e.target.value)}
                value={roomId}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button auto flat color="error" onPress={joinRoom}>
                Submit
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <select
          onChange={(e) => dispatch(selectGenreListId(e.target.value))}
          value={genreListId || "544711374"}
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>

      <div className="flex w-3/4 flex-wrap sm:justify-start  overflow-x-hidden justify-center gap-8">
        <div className="flex w-screen  overflow-y-hidden">
          {newdata?.map((song: any, i: any) => (
            <div
              className={
                isPlaying ? "opacity-0 transition-all duration-300" : play
              }
              key={i}
            >
              <SongCard
                key={song.key}
                song={song}
                isPlaying={isPlaying}
                activeSong={currentSong}
                data={data}
                i={i}
              />
            </div>
          ))}
        </div>
        <div className=" text-white flex w-full">
          {/* {messages[0].data.text} */}
          <ChatBody messages={messages} socket={socket} />
        </div>
      </div>
    </div>
  );
};

export default Discover;
