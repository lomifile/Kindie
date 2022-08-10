import * as React from "react";
import { useDisclosure } from "../hooks";
import Button from "../ui/Button";
import Nav from "../ui/Nav";

const Home: React.FC = () => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  return (
    <div>
      <Button onClick={onOpen}>Open menu</Button>
      <Nav variant="menu" isOpen={isOpen} onClose={onClose}>
        <div className="flex flex-row ml-10">Test</div>
        <ul className="flex flex-row ml-auto mr-10">
          <li>Test 1</li>
          <li>Test 2</li>
          <li>Test 3</li>
        </ul>
      </Nav>
    </div>
  );
};

export default Home;
