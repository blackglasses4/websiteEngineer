import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { editProduct } from '../../backend';

import "./Edit.scss";

const EditProduct = ({ product, onSave, onCancel }) => {
  const [editForm, setEditForm] = useState({
    id: product.id,
    category: product.category || "",
    gender: product.gender || "",
    name: product.name || "",
    image: product.image || "",
    popular: product.popular || false,
    new_price: product.new_price || 0,
    old_price: product.old_price || 0,
    description: product.description || "",
    sizes: product.sizes || [],
    color: product.color || [],
    material: product.material || "",
  });

  useEffect(() => {
    setEditForm({
      id: product.id,
      category: product.category || "",
      gender: product.gender || "",
      name: product.name || "",
      image: product.image || "",
      popular: product.popular || false,
      new_price: product.new_price || 0,
      old_price: product.old_price || 0,
      description: product.description || "",
      sizes: product.sizes || [],
      color: product.color || [],
      material: product.material || "",
    });
  }, [product]);

  const validateForm = () => {
    if (!editForm.name) return "Nazwa produktu jest wymagana.";
    if (!editForm.category) return "Kategoria produktu jest wymagana.";
    if (!editForm.gender) return "Płeć produktu jest wymagana.";
    if (!editForm.new_price) return "Nowa cena produktu jest wymagana.";
    return null;
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      toast.error(error, { position: "top-right", autoClose: 5000 });
      return;
    }
    try {

      const response = await editProduct({
        id: editForm.id,
        category: editForm.category,
        gender: editForm.gender,
        name: editForm.name,
        image: editForm.image,
        popular: editForm.popular,
        new_price: editForm.new_price,
        old_price: editForm.old_price,
        description: editForm.description,
        sizes: editForm.sizes,
        color: editForm.color,
        material: editForm.material,
    });

      // const response = await fetch(`${BACKEND_URL}/products/${editForm.id}`, {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     id: editForm.id,
      //     category: editForm.category,
      //     gender: editForm.gender,
      //     name: editForm.name,
      //     image: editForm.image,
      //     popular: editForm.popular,
      //     new_price: editForm.new_price,
      //     old_price: editForm.old_price,
      //     description: editForm.description,
      //     attributes: {
      //       sizes: editForm.attributes.sizes,
      //       color: editForm.attributes.color,
      //       material: editForm.attributes.material,
      //     },
      //   }),
      // });

      if (!response.ok) {
        throw new Error("Wystąpił błąd podczas aktualizacji produktu.");
      }

      const updatedProduct = await response.json();
      onSave(updatedProduct);
    } catch (error) {
      toast.error(error.message || "Nie udało się zaktualizować produktu.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  const handleSizeChange = (size) => {
    setEditForm((prevForm) => {
      const sizes = prevForm.sizes.includes(size)
        ? prevForm.sizes.filter((s) => s !== size)
        : [...prevForm.sizes, size];
  
      return {
        ...prevForm,
        sizes, // Teraz sizes jest bezpośrednio w głównym obiekcie
      };
    });
  };

  const handleMaterialChange = (material) => {
    setEditForm((prevForm) => ({
      ...prevForm,
      material,
    }));
  };
  
  const handleColorChange = (color) => {
    setEditForm((prevForm) => {
      const updatedColors = prevForm.color.includes(color)
        ? prevForm.color.filter((c) => c !== color)
        : [...prevForm.color, color];
  
      return {
        ...prevForm,
        color: updatedColors,
      };
    });
  };

  return (
    <>
      <table className="edit-product-form">
        <tbody>
          <tr>
            <td>
              <label>
                Kategoria:
                <select
                  id="input-text"
                  value={editForm.category || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, category: e.target.value })
                  }
                >
                  <option value="">Wybierz kategorię</option>
                  <option value="koszulka">Koszulka</option>
                  <option value="kurtka">Kurtka</option>
                  <option value="czapka">Czapka</option>
                  <option value="bluza">Bluza</option>
                  <option value="buty">Buty</option>
                  <option value="skarpetki">Skarpetki</option>
                  <option value="stanikSportowy">Stanik Sportowy</option>
                </select>
              </label>
            </td>
          </tr>
          <tr>
            <td>
              <label>
                Płeć:
                <select
                  id="input-text"
                  type="text"
                  value={editForm.gender || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, gender: e.target.value })
                  }
                >
                  <option value="">Wybierz płeć</option>
                  <option value="women">Kobieta</option>
                  <option value="men">Mężczyzna</option>
                  <option value="unisex">Dla obu płci</option>
                </select>
              </label>
            </td>
          </tr>
          <tr>
            <td>
              <label>
                Nazwa:
                <input
                  id="input-text"
                  type="text"
                  value={editForm.name || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                />
              </label>
            </td>
          </tr>
          <tr>
            <td>
              <label>
                Popularny:
                <input
                  id="input-popular"
                  type="checkbox"
                  checked={editForm.popular}
                  onChange={() =>
                    setEditForm((prevForm) => ({
                      ...prevForm,
                      popular: !prevForm.popular,
                    }))
                  }
                />
              </label>
            </td>
          </tr>
          <tr>
            <td>
              <label>
                Nowa cena:
                <input
                  id="input-text"
                  type="number"
                  value={editForm.new_price || ""}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      new_price: parseFloat(e.target.value),
                    })
                  }
                />
              </label>
            </td>
          </tr>
          <tr>
            <td>
              <label>
                Stara cena:
                <input
                  id="input-text"
                  type="number"
                  value={editForm.old_price || ""}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      old_price: parseFloat(e.target.value),
                    })
                  }
                />
              </label>
            </td>
          </tr>
          <tr>
            <td>
              <label>
                Opis:
                <textarea
                  value={editForm.description || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                />
              </label>
            </td>
          </tr>
          <tr>
            <td>
              <fieldset id="input-size">
                <legend>Rozmiary:</legend>
                {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                  <label key={size}>
                    {size}
                    <input
                      id="input-size"
                      type="checkbox"
                      value={size}
                      checked={editForm.sizes.includes(size)} // Zmieniamy na checked
                      onChange={() => handleSizeChange(size)}
                    />
                  </label>
                ))}
              </fieldset>
            </td>
          </tr>
          <tr>
            <td>
              <fieldset id="input-size">
                <legend>Kolory:</legend>
                {[
                  "white",
                  "black",
                  "lime",
                  "grey",
                  "red",
                  "green",
                  "blue",
                  "pink",
                  "navy",
                  "purple",
                  "yellow",
                  "turquoise",
                  "darkgreen",
                  "darkcyan",
                  "coral",
                ].map((color) => (
                  <label key={color}>
                    {color}
                    <input
                      type="checkbox"
                      value={color}
                      checked={editForm.color.includes(color)}
                      disabled={
                        !editForm.color.includes(color) &&
                        editForm.color.length >= 5
                      }
                      onChange={() => handleColorChange(color)}
                    />
                  </label>
                ))}
              </fieldset>
            </td>
          </tr>
          <tr>
            <td>
              <label>
                Materiał:
                <select
                  id="input-text"
                  type="text"
                  value={editForm.material || ""}
                  onChange={(e) => handleMaterialChange(e.target.value)}
                >
                  <option value="">Wybierz materiał</option>
                  <option value="poliester">Poliester</option>
                  <option value="bawełna">Bawełna</option>
                  <option value="elastan">Elastan</option>
                  <option value="spandex">Spandex</option>
                  <option value="nylon">Nylon</option>
                  <option value="poliamid">Poliamid</option>
                  <option value="polar">Polar</option>
                  <option value="puch">Puch</option>
                </select>
              </label>
            </td>
          </tr>
          <tr>
            <td>
              <button
                type="button"
                className="button-save"
                onClick={handleSaveProduct}
              >
                Zapisz
              </button>
              <button
                type="button"
                className="button-cancel"
                onClick={onCancel}
              >
                Anuluj
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="edit-product-form-mobile">
        <p>
          <span>Kategoria:</span>
          <select
            id="input-text"
            value={editForm.category || ""}
            onChange={(e) =>
              setEditForm({ ...editForm, category: e.target.value })
            }
          >
            <option value="">Wybierz kategorię</option>
            <option value="koszulka">Koszulka</option>
            <option value="kurtka">Kurtka</option>
            <option value="czapka">Czapka</option>
            <option value="bluza">Bluza</option>
            <option value="buty">Buty</option>
            <option value="skarpetki">Skarpetki</option>
            <option value="stanikSportowy">Stanik Sportowy</option>
          </select>
        </p>

        <p>
          <span>Płeć:</span>
          <select
            id="input-text"
            type="text"
            value={editForm.gender || ""}
            onChange={(e) =>
              setEditForm({ ...editForm, gender: e.target.value })
            }
          >
            <option value="">Wybierz płeć</option>
            <option value="women">Kobieta</option>
            <option value="men">Mężczyzna</option>
            <option value="unisex">Dla obu płci</option>
          </select>
        </p>

        <p>
          <span>Nazwa:</span>
          <input
            id="input-text"
            type="text"
            value={editForm.name || ""}
            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
          />
        </p>

        <p>
          <span>Popularny:</span>
          <input
            id="input-popular"
            type="checkbox"
            checked={editForm.popular}
            onChange={() =>
              setEditForm((prevForm) => ({
                ...prevForm,
                popular: !prevForm.popular,
              }))
            }
          />
        </p>

        <p>
          <span>Nowa cena:</span>
          <input
            id="input-text"
            type="number"
            value={editForm.new_price || ""}
            onChange={(e) =>
              setEditForm({
                ...editForm,
                new_price: parseFloat(e.target.value),
              })
            }
          />
        </p>

        <p>
          <span>Stara cena:</span>
          <input
            id="input-text"
            type="number"
            value={editForm.old_price || ""}
            onChange={(e) =>
              setEditForm({
                ...editForm,
                old_price: parseFloat(e.target.value),
              })
            }
          />
        </p>

        <p>
          <span>Opis:</span>
          <textarea
            value={editForm.description || ""}
            onChange={(e) =>
              setEditForm({ ...editForm, description: e.target.value })
            }
          />
        </p>

        <div className="sizes">
          <p>
            <span>Rozmiary:</span>
          </p>
          {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
            <p key={size}>
              <label>
                {size}
                <input
                  id="input-size"
                  type="checkbox"
                  value={size}
                  checked={editForm.sizes.includes(size)}
                  onChange={() => handleSizeChange(size)}
                />
              </label>
            </p>
          ))}
        </div>

        <div className="colors">
          <p>
            <span>Kolory:</span>
          </p>
          {[
            "white",
            "black",
            "lime",
            "grey",
            "red",
            "green",
            "blue",
            "pink",
            "navy",
            "purple",
            "yellow",
            "turquoise",
            "darkgreen",
            "darkcyan",
            "coral",
          ].map((color) => (
            <p key={color}>
              <label>
                {color}
                <input
                  type="checkbox"
                  value={color}
                  checked={editForm.color.includes(color)}
                  disabled={
                    !editForm.color.includes(color) &&
                    editForm.color.length >= 5
                  }
                  onChange={() => handleColorChange(color)}
                />
              </label>
            </p>
          ))}
        </div>

        <p>
          <span>Materiał:</span>
          <select
            id="input-text"
            type="text"
            value={editForm.material || ""}
            onChange={(e) => handleMaterialChange(e.target.value)}
          >
            <option value="">Wybierz materiał</option>
            <option value="poliester">Poliester</option>
            <option value="bawełna">Bawełna</option>
            <option value="elastan">Elastan</option>
            <option value="spandex">Spandex</option>
            <option value="nylon">Nylon</option>
            <option value="poliamid">Poliamid</option>
            <option value="polar">Polar</option>
            <option value="puch">Puch</option>
          </select>
        </p>

        <div className="buttons">
          <button
            type="button"
            className="button-save"
            onClick={handleSaveProduct}
          >
            Zapisz
          </button>
          <button type="button" className="button-cancel" onClick={onCancel}>
            Anuluj
          </button>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
