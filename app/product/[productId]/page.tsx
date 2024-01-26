"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { fetchProductDetails } from "@/app/api/productDetails";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductDetails({
  params,
}: {
  params: { productId: string };
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  interface Selection {
    color: string | null;
    size: string | null;
  }

  const productId = parseInt(params.productId, 10);
  const [productDetails, setProductDetails] = useState(null);
  const [showInfoPop, setShowInfoPop] = useState(false);
  const [selection, setSelection] = useState<Selection>({
    color: "",
    size: "",
  });
  const [selectedSize, setSelectedSize] = useState(() => {
    return searchParams.get("size");
  });
  const [selectedColor, setSelectedColor] = useState(() => {
    return searchParams.get("color");
  });
  const [cart, setCart] = useState(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    }
  });
  
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (productId) {
          const data = await fetchProductDetails(productId.toString());
          setProductDetails(data);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
      } catch (error) {
        console.error(error);
      }
    };
    fetchDetails();
  }, [productId, cart]);

  const handleSelectionChange = (type: "color" | "size", value: string) => {
    const newSelection = { ...selection, [type]: value };

    setSelection(newSelection);

    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (type == "color") {
      current.set("color", value);
      setSelectedColor(newSelection.color);
    }
    if (type == "size") {
      current.set("size", value);
      setSelectedSize(newSelection.size);
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
  };

  const handleAddToCart = (e) => {
    if (!selectedColor || !selectedSize) {
      setShowInfoPop(true);
      e.persist();
      e.preventDefault();
      toast.error("Please select color and size before adding to cart");
    } else {
      const newItem = {
        id: productDetails.id,
        name: productDetails.color,
        color: selectedColor,
        size: selectedSize,
      };
      setCart((prevCart) => [...prevCart, newItem]);
    }
  };

  if (!productDetails) {
    return <div>Loading...</div>;
  }

  const convertToSlug = (text: string): string => {
    return text.toLowerCase().replace(/ /g, "-");
  };
  return (
    <>
      <div className="bg-white">
        <div className="pb-16 pt-6 sm:pb-24">
          <nav
            aria-label="Breadcrumb"
            className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          >
            <ol role="list" className="flex items-center space-x-4">
              <li>
                <div className="flex items-center">
                  <Link href="/">
                    <p className="mr-4 text-sm font-medium text-gray-900">
                      Products
                    </p>
                  </Link>
                  <svg
                    viewBox="0 0 6 20"
                    aria-hidden="true"
                    className="h-5 w-auto text-gray-300"
                  >
                    <path
                      d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <a
                    href="#"
                    className="mr-4 text-sm font-medium text-gray-900"
                  >
                    {productDetails.productCategory}
                  </a>
                  <svg
                    viewBox="0 0 6 20"
                    aria-hidden="true"
                    className="h-5 w-auto text-gray-300"
                  >
                    <path
                      d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </li>
              <li className="text-sm">
                <a
                  href="#"
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {productDetails.name}
                </a>
              </li>
            </ol>
          </nav>
          <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
              <div className="lg:col-span-5 lg:col-start-8">
                <div className="flex justify-between">
                  <h1 className="text-xl font-medium text-gray-900">
                    {productDetails.name}
                  </h1>
                  <p className="text-xl font-medium text-gray-900">
                    ${productDetails.basePrice}
                  </p>
                </div>
                {/* Reviews */}
              </div>
              {/* Image gallery */}
              <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
                <h2 className="sr-only">Images</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
                  <img
                    src={productDetails.featuredImage}
                    alt={productDetails.name}
                    className="lg:col-span-2 lg:row-span-2 rounded-lg"
                  />
                  <img
                    src={productDetails.featuredImage}
                    alt={productDetails.name}
                    className="hidden lg:block rounded-lg"
                  />
                  <img
                    src={productDetails.featuredImage}
                    alt={productDetails.name}
                    className="hidden lg:block rounded-lg"
                  />
                </div>
              </div>
              <div className="mt-8 lg:col-span-5">
                <form>
                  {/* Color picker */}
                  <div>
                    <h2 className="text-sm font-medium text-gray-900">Color</h2>
                    <fieldset className="mt-2">
                      <legend className="sr-only">Choose a color</legend>
                      <div className="flex items-center space-x-3">
                        {/*
              Active and Checked: "ring ring-offset-1"
              Not Active and Checked: "ring-2"
            */}
                        {productDetails.colorOptions.map((color) => (
                          <div key={color}>
                            <label
                              className={`relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ${
                                selectedColor === color
                                  ? "ring-2 ring-indigo-500 ring-offset-2"
                                  : `ring-${convertToSlug(color)}-900`
                              }`}
                            >
                              <input
                                type="radio"
                                name="color-choice"
                                value={color}
                                // onChange={() => setSelectedColor(color)}
                                onClick={() =>
                                  handleSelectionChange("color", color)
                                }
                                className="sr-only"
                                aria-labelledby="color-choice-0-label"
                              />
                              <span
                                id="color-choice-0-label"
                                className="sr-only"
                              >
                                {color}
                              </span>
                              <span
                                aria-hidden="true"
                                className={`h-8 w-8 bg-${convertToSlug(
                                  color
                                )} rounded-full border border-${convertToSlug(
                                  color
                                )} border-opacity-10`}
                              />
                            </label>
                          </div>
                        ))}

                        {/*
              Active and Checked: "ring ring-offset-1"
              Not Active and Checked: "ring-2"
            */}
                      </div>
                    </fieldset>
                  </div>
                  {/* Size picker */}
                  <div className="mt-8">
                    <div className="flex items-center justify-between">
                      <h2 className="text-sm font-medium text-gray-900">
                        Size
                      </h2>
                    </div>
                    <fieldset className="mt-2">
                      <legend className="sr-only">Choose a size</legend>
                      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                        {/*
              In Stock: "cursor-pointer", Out of Stock: "opacity-25 cursor-not-allowed"
              Active: "ring-2 ring-indigo-500 ring-offset-2"
              Checked: "border-transparent bg-indigo-600 text-white hover:bg-indigo-700", Not Checked: "border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
            */}
                        {productDetails.storageOptions.map((storage) => (
                          <div key={storage}>
                            <label
                              className={`flex items-center justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase sm:flex-1 cursor-pointer focus:outline-none ${
                                selectedSize === storage
                                  ? "border-transparent bg-indigo-600 text-white hover:bg-indigo-700"
                                  : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
                              }`}
                            >
                              <input
                                type="radio"
                                name="size-choice"
                                value={storage}
                                onClick={() =>
                                  handleSelectionChange("size", storage)
                                }
                                className="sr-only"
                                aria-labelledby="size-choice-0-label"
                              />
                              <span id="size-choice-0-label">{storage}</span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </fieldset>
                  </div>
                  {showInfoPop && <ToastContainer position="top-right" />}
                  <Link href="/cart">
                    <button
                      type="submit"
                      onClick={handleAddToCart}
                      className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Add to cart
                    </button>
                  </Link>
                </form>
                {/* Product details */}
                <div className="mt-10">
                  <h2 className="text-sm font-medium text-gray-900">
                    Description
                  </h2>
                  <div className="prose prose-sm mt-4 text-gray-500">
                    <p>{productDetails.description}</p>
                  </div>
                </div>
                <div className="mt-10">
                  <h2 className="text-sm font-medium text-gray-900">CPU</h2>
                  <div className="prose prose-sm mt-4 text-gray-500">
                    <p>{productDetails.CPU}</p>
                  </div>
                </div>
                <div className="mt-10">
                  <h2 className="text-sm font-medium text-gray-900">Display</h2>
                  <div className="prose prose-sm mt-4 text-gray-500">
                    <p>{productDetails.display}</p>
                  </div>
                </div>
                {/* Policies */}
                <section aria-labelledby="policies-heading" className="mt-10">
                  <h2 id="policies-heading" className="sr-only">
                    Our Policies
                  </h2>
                  <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
                      <dt>
                        <svg
                          className="mx-auto h-6 w-6 flex-shrink-0 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.115 5.19l.319 1.913A6 6 0 008.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 002.288-4.042 1.087 1.087 0 00-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 01-.98-.314l-.295-.295a1.125 1.125 0 010-1.591l.13-.132a1.125 1.125 0 011.3-.21l.603.302a.809.809 0 001.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 001.528-1.732l.146-.292M6.115 5.19A9 9 0 1017.18 4.64M6.115 5.19A8.965 8.965 0 0112 3c1.929 0 3.716.607 5.18 1.64"
                          />
                        </svg>
                        <span className="mt-4 text-sm font-medium text-gray-900">
                          International delivery
                        </span>
                      </dt>
                      <dd className="mt-1 text-sm text-gray-500">
                        Get your order in 2 years
                      </dd>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
                      <dt>
                        <svg
                          className="mx-auto h-6 w-6 flex-shrink-0 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="mt-4 text-sm font-medium text-gray-900">
                          Loyalty rewards
                        </span>
                      </dt>
                      <dd className="mt-1 text-sm text-gray-500">
                        Don't look at other tees
                      </dd>
                    </div>
                  </dl>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
