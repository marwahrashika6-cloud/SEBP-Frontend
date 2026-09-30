import { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Search,
  Music,
  Pause,
  LogOut,
  User,
  SlidersHorizontal,
  X,
} from "lucide-react";

const events = [
  {
    id: 1,
    title: "Prompt War — AI Prompting Competition",
    date: "23 Sep 2026",
    time: "9:30 AM – 4:25 PM",
    location: "Block B1",
    price: 0,
    category: "Competition",
    description:
      "Think, create and compete in the ultimate AI prompting challenge.",
  },
  {
    id: 2,
    title: "Code Clash 2026",
    date: "5 Oct 2026",
    time: "2:00 PM – 6:00 PM",
    location: "Block C2",
    price: 199,
    category: "Hackathon",
    description:
      "A high-energy coding challenge for builders and problem solvers.",
  },
  {
    id: 3,
    title: "Build Summit",
    date: "15 Oct 2026",
    time: "10:00 AM – 3:00 PM",
    location: "Auditorium",
    price: 0,
    category: "Conference",
    description:
      "Meet innovators, explore technology and build something meaningful.",
  },
  {
    id: 4,
    title: "DesignVerse",
    date: "21 Oct 2026",
    time: "5:00 PM – 8:00 PM",
    location: "Block B1",
    price: 99,
    category: "Workshop",
    description:
      "A creative workshop covering UI, UX and visual storytelling.",
  },
];

function Login({ onLogin, onGuest }) {
  const [register, setRegister] = useState(false);

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="logo-big">✦</div>

        <h1>SEBP</h1>

        <p>Smart Event Booking Platform</p>

        <div className="floating-ticket">
          🎟️ Your campus. Your events. Your memories.
        </div>
      </div>

      <div className="login-right">
        <div className="logo">✦ SEBP</div>

        <h2>
          {register ? "Create your account." : "Welcome back."}
        </h2>

        <p className="muted">
          Access college events, tickets and experiences.
        </p>

        {register && <input placeholder="Full Name" />}

        <input placeholder="Email address" />

        <input
          type="password"
          placeholder="Password"
        />

        <button
          className="primary-btn"
          onClick={onLogin}
        >
          {register ? "Register" : "Login"}
        </button>

        <button
          className="guest-btn"
          onClick={onGuest}
        >
          Continue as Guest
        </button>

        <p className="switch">
          {register
            ? "Already registered? "
            : "New to SEBP? "}

          <button
            onClick={() => setRegister(!register)}
          >
            {register ? "Login" : "Create account"}
          </button>
        </p>
      </div>
    </div>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [guest, setGuest] = useState(false);

  const [search, setSearch] = useState("");

  const [location, setLocation] = useState("All");

  const [price, setPrice] = useState("All");

  const [selectedEvent, setSelectedEvent] =
    useState(null);

  const [music, setMusic] = useState(false);

  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  if (!loggedIn && !guest) {
    return (
      <Login
        onLogin={() => setLoggedIn(true)}
        onGuest={() => setGuest(true)}
      />
    );
  }

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesLocation =
      location === "All" ||
      event.location === location;

    const matchesPrice =
      price === "All" ||
      (price === "Free" && event.price === 0) ||
      (price === "Paid" && event.price > 0);

    return (
      matchesSearch &&
      matchesLocation &&
      matchesPrice
    );
  });

  const openBooking = (event) => {
    setSelectedEvent(event);

    setForm({
      name: "",
      email: "",
      phone: "",
    });
  };

  const confirmBooking = () => {
    if (
      !form.name ||
      !form.email ||
      !form.phone
    ) {
      alert("Please fill all details.");
      return;
    }

    setSelectedEvent(null);

    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
    }, 4000);
  };

  return (
    <div className="app">

      {/* SIDEBAR */}

      <aside className="sidebar">

        <div>
          <div className="logo">
            ✦ SEBP
          </div>

          <div className="subtitle">
            SMART EVENT BOOKING PLATFORM
          </div>
        </div>

        <nav>

          <button className="nav-active">
            🏠 Dashboard
          </button>

          <button>
            🎟️ My Tickets
          </button>

          <button>
            📅 My Events
          </button>

          <button>
            👤 Profile
          </button>

        </nav>

        <div className="filters">

          <h4>
            <SlidersHorizontal size={15} />
            FILTER EVENTS
          </h4>

          <label>
            Location
          </label>

          <select
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
          >
            <option>All</option>
            <option>Block B1</option>
            <option>Block C2</option>
            <option>Auditorium</option>
          </select>

          <label>
            Price
          </label>

          <select
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
          >
            <option>All</option>
            <option>Free</option>
            <option>Paid</option>
          </select>

        </div>

        <button
          className="music-btn"
          onClick={() => setMusic(!music)}
        >

          {music ? (
            <Pause size={18} />
          ) : (
            <Music size={18} />
          )}

          {music
            ? "Music On"
            : "Music Off"}

        </button>

        <button
          className="logout"
          onClick={() => {
            setLoggedIn(false);
            setGuest(false);
          }}
        >
          <LogOut size={16} />
          Logout
        </button>

      </aside>

      {/* MAIN DASHBOARD */}

      <main className="main">

        <header>

          <div>

            <p className="eyebrow">
              WELCOME TO SEBP
            </p>

            <h1>
              Discover your next{" "}
              <span>
                college event.
              </span>
            </h1>

            <p className="muted">
              Book your seat, get your ticket,
              and make memories.
            </p>

          </div>

          <div className="profile">

            <User size={18} />

            {guest
              ? "Guest User"
              : "Student"}

          </div>

        </header>

        {/* SEARCH */}

        <div className="search">

          <Search size={19} />

          <input
            placeholder="Search events..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        {/* EVENTS */}

        <div className="section-head">

          <h2>
            Upcoming Events
          </h2>

          <span>
            {filteredEvents.length} events
          </span>

        </div>

        <div className="event-grid">

          {filteredEvents.map((event) => (

            <article
              className="event-card"
              key={event.id}
            >

              <div className="event-top">

                <span className="category">
                  {event.category}
                </span>

                <span
                  className={
                    event.price
                      ? "paid"
                      : "free"
                  }
                >
                  {event.price
                    ? `₹${event.price}`
                    : "FREE"}
                </span>

              </div>

              <h3>
                {event.title}
              </h3>

              <p>
                {event.description}
              </p>

              <div className="event-info">

                <span>
                  <Calendar size={15} />
                  {event.date}
                </span>

                <span>
                  <Clock size={15} />
                  {event.time}
                </span>

                <span>
                  <MapPin size={15} />
                  {event.location}
                </span>

              </div>

              <button
                className="book-btn"
                onClick={() =>
                  openBooking(event)
                }
              >
                {event.price
                  ? "Book Now"
                  : "Enroll Now"}
              </button>

            </article>

          ))}

        </div>

      </main>

      {/* BOOKING MODAL */}

      {selectedEvent && (

        <div className="overlay">

          <div className="modal">

            <button
              className="close"
              onClick={() =>
                setSelectedEvent(null)
              }
            >
              <X />
            </button>

            <div className="ticket-label">
              ✦ SEBP TICKET
            </div>

            <h2>
              {selectedEvent.title}
            </h2>

            <p className="muted">
              {selectedEvent.date} ·{" "}
              {selectedEvent.time}
            </p>

            <p className="muted">
              {selectedEvent.location} ·{" "}
              {selectedEvent.price
                ? `₹${selectedEvent.price}`
                : "Free"}
            </p>

            <input
              placeholder="Full Name"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />

            <input
              placeholder="Email address"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />

            <input
              placeholder="Phone number"
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value,
                })
              }
            />

            {selectedEvent.price > 0 && (

              <div className="payment-box">

                💳 UPI Payment Gateway

                <strong>
                  ₹{selectedEvent.price}
                </strong>

              </div>

            )}

            <button
              className="confirm-btn"
              onClick={confirmBooking}
            >
              {selectedEvent.price
                ? "Proceed to UPI & Confirm"
                : "Confirm Enrollment"}
            </button>

          </div>

        </div>

      )}

      {/* SUCCESS POPUP */}

      {success && (

        <div className="success-popup">

          <div className="success-icon">
            🎉
          </div>

          <strong>
            Booking Confirmed!
          </strong>

          <p>
            Thank you for booking with SEBP.
            <br />
            Have a good day!
          </p>

          <small>
            Confirmation sent to your email.
          </small>

        </div>

      )}

    </div>
  );
}

export default App;