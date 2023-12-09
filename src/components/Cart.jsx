import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import URL from "./url";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import "./css/cart.css";

const Cart = () => {
    const navigate = useNavigate();
	const [booksInCart, setBooksinCart] = useState([]);
	const [deleteErr, setDeleteErr] = useState(false);
	const [cartToBeShown, setCartToBEShown] = useState(true);
	const [networkState, setNetworState] = useState(false);
	const [paymentToBeShown, setPaymentToBEShown] = useState(false);
	const [country, setCountry] = useState("");
	const [province, setProvince] = useState("");
	const [city, setCity] = useState("");
	const [isCityValid, setIsCityValid] = useState(false);
	const [street, setStreet] = useState("");
	const [zipcode, setZipCode] = useState("");
	const [isZipValid, setIsZipValid] = useState(false);
	const [phone, setPhone] = useState("");
	const [isPhoneValid, setIsPhoneValid] = useState(false);
	// cardNumber
	const [caardType, setCaardType] = useState(null);
	const [cardTypeFromUser, setcardTypeFromUser] = useState(null);
	const [creditCardNumber, setCreditCardNumber] = useState("");
	const [expirationDate, setExpirationDate] = useState("");
	const [cvv, setCVV] = useState("");
	const [cardholderName, setCardholderName] = useState("");

	const countriesAndProvinces = {
		Canada: [
			"Alberta",
			"British Columbia",
			"Manitoba",
			"New Brunswick",
			"Newfoundland and Labrador",
			"Nova Scotia",
			"Ontario",
			"Prince Edward Island",
			"Quebec",
			"Saskatchewan",
		],
		US: [
			"Alabama",
			"Alaska",
			"Arizona",
			"Arkansas",
			"California",
			"Colorado",
			"Connecticut",
			"Delaware",
			"Florida",
			"Georgia",
			"Hawaii",
			"Idaho",
			"Illinois",
			"Indiana",
			"Iowa",
			"Kansas",
			"Kentucky",
			"Louisiana",
			"Maine",
			"Maryland",
			"Massachusetts",
			"Michigan",
			"Minnesota",
			"Mississippi",
			"Missouri",
			"Montana",
			"Nebraska",
			"Nevada",
			"New Hampshire",
			"New Jersey",
			"New Mexico",
			"New York",
			"North Carolina",
			"North Dakota",
			"Ohio",
			"Oklahoma",
			"Oregon",
			"Pennsylvania",
			"Rhode Island",
			"South Carolina",
			"South Dakota",
			"Tennessee",
			"Texas",
			"Utah",
			"Vermont",
			"Virginia",
			"Washington",
			"West Virginia",
			"Wisconsin",
			"Wyoming",
		],
	};

	useEffect(() => {
		axios
			.get(`${URL}/cart/getItem?UserId=${Cookies.get("userID")}`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${Cookies.get("jwt")}`,
				},
			})
			.then((resp) => {
				setBooksinCart(resp.data);
				// console.log(resp);
			})
			.catch((err) => {});
	}, []);
	if (!Cookies.get("jwt")) {
		return <Navigate replace to="/login" />;
	}
	const deleteFromCart = (id) => {
		axios
			.delete(
				`${URL}/cart/deleteItem?UserId=${Cookies.get("userID")}&bookID=${id}`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${Cookies.get("jwt")}`,
					},
				},
			)
			.then((resp) => {
				axios
					.get(`${URL}/cart/getItem?UserId=${Cookies.get("userID")}`, {
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${Cookies.get("jwt")}`,
						},
					})
					.then((resp) => {
						setBooksinCart(resp.data);
					})
					.catch((err) => {});
			})
			.catch((err) => {
				setDeleteErr(true);
			});
	};

	const proceedToPayment = () => {
		setCartToBEShown(false);
	};
	function isValidCanadianPostalCode(postalCode) {
		const canadianPostalCodeRegex =
			/^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$|^[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d$/;
		// console.log(canadianPostalCodeRegex.test(postalCode))
		return setIsZipValid(canadianPostalCodeRegex.test(postalCode));
	}
	function isValidUSAPostalCode(postalCode) {
		const usaPostalCodeRegex = /^\d{5}(?:-\d{4})?$/;
		return setIsZipValid(usaPostalCodeRegex.test(postalCode));
	}

	function isValidNorthAmericanPhoneNumber(phoneNumber) {
		const naPhoneNumberRegex =
			/^(\+\d{1,2}\s?)?(\()?(\d{3})(\))?[-.\s]?(\d{3})[-.\s]?(\d{4})$/;
		return setIsPhoneValid(naPhoneNumberRegex.test(phoneNumber));
	}
	function isValidCityName(cityName) {
		const cityRegex = /^[A-Za-z\s]+$/;
		return setIsCityValid(cityRegex.test(cityName));
	}

	//!--------------------------

	const validateCreditCard = (event) => {
		event.preventDefault();
		const creditCardPatterns = {
			mastercard: /^5[1-5]\d{14}$/,
			visa: /^4\d{15}$/,
			amex: /^3[47]\d{13}$/,
		};
		const expirationDatePattern = /^(0[1-9]|1[0-2])\/(20[1-9][6-9]|203[0-1])$/;
		const cvvPattern = /^\d{3,4}$/;
		const cardType = detectCardType(creditCardNumber);
		if (!cardType || !creditCardPatterns[cardType].test(creditCardNumber)) {
			alert("Invalid credit card number. Please enter a valid one.");
			return;
		}
		const [month, year] = expirationDate.split("/");
		const currentYear = new Date().getFullYear();
		const currentMonth = new Date().getMonth() + 1;
		if (
			expirationDatePattern.test(expirationDate) ||
			parseInt(year) < currentYear || parseInt(year) > 2031 ||
			(parseInt(year) === currentYear && parseInt(month) < currentMonth)
		) {
			alert(
				"Invalid expiration date. Please enter a valid one in MM/YYYY format.",
			);
			return;
		}
		if (!cvvPattern.test(cvv) || ((cvv.length === 4)&& cardType!=="amex")) {
			alert("Invalid CVV code. Please enter a valid one.");
			return;
		}
		if (!cardholderName.trim() || !isValidName(cardholderName)) {
			alert("Cardholder name is required. Please enter a valid name.");
			return;
		}
		if (cardTypeFromUser !== caardType || cardTypeFromUser === null) {
			alert("card type and number do not match!");
			return;
		}
		// console.log(isValidName(cardholderName));
		// alert("Credit card information is valid!");


        booksInCart.map(async (book) => {

            try{
            const  response = await axios.post(`${URL}/transaction/create`,{
                BookId: book.bookId,
                BuyerId: Cookies.get('userID'),
                SellerId: book.bookSellerId,
                TotalAmount: book.bookPrice
            },{
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${Cookies.get("jwt")}`,
                        },
            })
            deleteFromCart(book.bookId)
        }
            catch(err) {
                alert("something went wrong!!", book.bookId)
            }
    

            return <></>
        })
        alert("all orders placed!!");
        navigate("/cart/");
        
		//   !--------
		//   booksInCart.map((book))
	};
	const detectCardType = (creditCardNumber) => {
		if (/^5[1-5]/.test(creditCardNumber)) {
			return "mastercard";
		} else if (/^4/.test(creditCardNumber)) {
			return "visa";
		} else if (/^3[47]/.test(creditCardNumber)) {
			return "amex";
		}

		return null;
	};

	const validateAndSave = () => {
		if (
			country === "" ||
			province === "" ||
			city === "" ||
			street === "" ||
			zipcode === "" ||
			phone === "" ||
			isCityValid !== true ||
			isPhoneValid !== true ||
			isZipValid !== true
		) {
			alert(
				"all fields are required and should be in the correct format please!!",
			);
			return;
		}

		setNetworState(true);
		axios
			.post(
				`${URL}/address/create`,
				{
					UserId: Cookies.get("userID"),
					Street: street,
					City: city,
					State: province,
					ZipCode: zipcode,
					Country: country,
					Phone: phone,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${Cookies.get("jwt")}`,
					},
				},
			)
			.then((resp) => {
				alert("address save, proceed to payment");
				setPaymentToBEShown(true);
			})
			.catch((error) => {
				alert(error.response.data.errors.ZipCode[0]);
				console.log(error);
			});
		setNetworState(false);
	};
	function isValidName(name) {
		// Name should not contain specified characters
		const invalidCharactersRegex = /[;:!@#$%^*+?\\/<>1234567890]/;
		return !invalidCharactersRegex.test(name);
	}
	return (
		<main className="main-cart">
            {(booksInCart.length === 0)&& <div>{`Nothing to be Shown... :)`}</div> }
			{cartToBeShown && (booksInCart.length > 0) &&
				booksInCart.map((book) => {
					return (
						<div className="cart-item">
							<h5>
								{book.bookId} {book.bookTitle}
							</h5>
							<button
								className="delete-button"
								style={{ color: "red", fontSize: 26 }}
								onClick={() => deleteFromCart(book.bookId)}
							>
								&#128465;
							</button>
							{deleteErr && (
								<p style={{ color: "red", fontSize: 8 }}>
									{" "}
									An error occured while deleting the Item from the cart
								</p>
							)}
						</div>
					);
				})}
			{booksInCart.length > 0 && cartToBeShown && !paymentToBeShown && (
				<div className="buy-all-cart-items">
					{" "}
					<button onClick={proceedToPayment}> Buy all</button>
				</div>
			)}
			{/* {console.log("-> ",country)} */}
			{!cartToBeShown && !paymentToBeShown && (
				<>
					<div className="address">
						Please provide the shipping address
						<span style={{ width: "30%" }}>
							<input
								style={{ width: "10%" }}
								type="radio"
								value={"Canada"}
								name="country"
								onClick={(e) => {
									setCountry(e.target.value);
								}}
								className="country"
							/>{" "}
							Canada
							<input
								style={{ width: "10%" }}
								type="radio"
								value={"US"}
								name="country"
								onClick={(e) => {
									setCountry(e.target.value);
								}}
								className="country"
							/>{" "}
							USA
						</span>
						<span>
							<label for="selectFruit">Choose a province:</label>

							<select
								style={{ marginLeft: 10 }}
								id="province"
								name="province"
								value={province}
								onChange={(e) => {
									setProvince(e.target.value);
								}}
							>
								<option value={""}>Select</option>
								{country !== "" &&
									countriesAndProvinces[country].map((state) => {
										return <option value={state}>{state}</option>;
									})}
							</select>
							<span style={{ display: "inline-flex", flexDirection: "column" }}>
								<input
									type="text"
									value={city}
									className="city"
									placeholder="City"
									onChange={(e) => {
										setCity(e.target.value);
										isValidCityName(e.target.value);
									}}
								/>
								{!isCityValid && city !== "" && (
									<p className="city-valid">
										City can not have digits and special character
									</p>
								)}
							</span>
							<input
								type="text"
								value={street}
								className="street"
								placeholder="Street Number & Name"
								onChange={(e) => {
									setStreet(e.target.value);
								}}
							/>
							<span style={{ display: "inline-flex", flexDirection: "column" }}>
								<input
									type="text"
									value={zipcode}
									className="postal"
									placeholder={"Postal Code"}
									onChange={(e) => {
										setZipCode(e.target.value);
										country !== "" && country === "Canada"
											? isValidCanadianPostalCode(e.target.value)
											: isValidUSAPostalCode(e.target.value);
									}}
								/>
								{!isZipValid && zipcode !== "" && (
									<p className="postal-code-valid">Postal code is not valid</p>
								)}
							</span>
						</span>
						<span style={{ display: "inline-flex", flexDirection: "column" }}>
							<input
								type="text"
								value={phone}
								className="phone-number"
								placeholder={"+1(783)8820982 "}
								onChange={(e) => {
									setPhone(e.target.value);
									isValidNorthAmericanPhoneNumber(e.target.value);
								}}
							/>
							{!isPhoneValid && phone !== "" && (
								<p className="phone-valid">Phone number is not valid</p>
							)}
						</span>
						<button
							disabled={networkState}
							style={{
								width: "50%",
								marginLeft: "50%",
								transform: "translateX(-50%)",
								backgroundColor: "var(--var-primary-color)",
								border: "none",
								borderRadius: 8,
								padding: "1vh 0vw",
								cursor: "pointer",
								boxShadow: "0 0 5px var(--var-secondary-color)",
							}}
							onClick={() => {
								validateAndSave();
							}}
						>
							Save and Proceed to pay{" "}
						</button>
					</div>
				</>
			)}

			{paymentToBeShown && (
				<>
					{/* <div className="divider"></div> */}
					<div className="payment">
						Payment details
						<form onSubmit={validateCreditCard}>
							<span>
								<span>
									<input
										type="radio"
										name="cardTypeFromUser"
										id="cardTypeFromUser"
										value="mastercard"
										onClick={() => setcardTypeFromUser("mastercard")}
									/>{" "}
									MasterCard
								</span>
								<span>
									<input
										type="radio"
										name="cardTypeFromUser"
										id="cardTypeFromUser"
										value="visa"
										onClick={() => setcardTypeFromUser("visa")}
									/>
									Visa
								</span>
								<span>
									<input
										type="radio"
										name="cardTypeFromUser"
										id="cardTypeFromUser"
										value="amex"
										onClick={() => setcardTypeFromUser("amex")}
									/>
									Amex
								</span>
							</span>
							<span>
								<label htmlFor="creditCardNumber">Credit Card Number:</label>
								<input
									type="text"
									id="creditCardNumber"
									placeholder="Enter credit card number"
									value={creditCardNumber}
									onChange={(e) => {
										setCreditCardNumber(e.target.value);
										setCaardType(detectCardType(e.target.value));
									}}
									required
								/>
								{`  ${caardType}`}
							</span>
							{/* <br /> */}
							<span>
								<label htmlFor="expirationDate">Expiration Date:</label>
								<input
									type="text"
									id="expirationDate"
									placeholder="MM/YYYY"
									value={expirationDate}
									onChange={(e) => setExpirationDate(e.target.value)}
									required
								/>
							</span>
							<span>
								<label htmlFor="cvv">CVV Code:</label>
								<input
									type="text"
									id="cvv"
									placeholder="Enter CVV code"
									value={cvv}
									onChange={(e) => setCVV(e.target.value)}
									required
								/>
							</span>
							<span>
								<label htmlFor="cardholderName">Cardholder Name:</label>
								<input
									type="text"
									id="cardholderName"
									placeholder="Enter cardholder name"
									value={cardholderName}
									onChange={(e) => setCardholderName(e.target.value)}
									required
								/>
							</span>
							<button type="submit">Submit</button>
						</form>
					</div>
				</>
			)}
		</main>
	);
};
export default Cart;
