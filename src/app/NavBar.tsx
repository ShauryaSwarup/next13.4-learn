"use client";

import Link from "next/link";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useRouter, usePathname } from "next/navigation";
import { NavDropdown } from "react-bootstrap";
export default function NavBar() {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <Navbar
            bg='primary'
            variant='dark'
            sticky='top'
            expand='sm'
            collapseOnSelect
        >
            <Container>
                <Navbar.Brand as={Link} href='/'>
                    NextJS 13.4
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className='justify-content-end'>
                    <Nav className='me-auto'>
                        <Nav.Link
                            as={Link}
                            href='/hello'
                            active={pathname === "/hello"}
                        >
                            Hello
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            href='/statimg'
                            active={pathname === "/statimg"}
                        >
                            Static
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            href='/dynaimg'
                            active={pathname === "/dynaimg"}
                        >
                            Dynamic
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            href='/isrimg'
                            active={pathname === "/isrimg"}
                        >
                            ISR
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            href='/search'
                            active={pathname === "/search"}
                        >
                            Search
                        </Nav.Link>
                        <NavDropdown title='StaticParams' id='basic-nav-dropdown'>
                            <NavDropdown.Item
                                as={Link}
                                href='/topic/fitness'
                                active={pathname === "/topic/fitness"}
                            >
                                Fitness
                            </NavDropdown.Item>
                            <NavDropdown.Item
                                as={Link}
                                href='/topic/coding'
                                active={pathname === "/topic/coding"}
                            >
                                Coding
                            </NavDropdown.Item>
                            <NavDropdown.Item
                                as={Link}
                                href='/topic/health'
                                active={pathname === "/topic/health"}
                                
                            >
                                Health
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
