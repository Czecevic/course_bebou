"use client";
import { useState, useTransition, useEffect } from "react";
import Link from "next/link";
import { createAlimentationAction } from "@/app/actions/createAlimentationAction";
import { getCategories } from "@/app/actions/getCategories";

export const AddAliment = () => {
  const [aliment, setAliment] = useState("");
  const [categorie, setCategorie] = useState("");
  const [newCategorie, setNewCategorie] = useState("");
  const [useExistingCategory, setUseExistingCategory] = useState(true);
  const [existingCategories, setExistingCategories] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Charger les catégories existantes
  useEffect(() => {
    getCategories().then(setExistingCategories).catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!aliment.trim()) {
      setError("Veuillez entrer un nom d'aliment");
      return;
    }

    const finalCategorie = useExistingCategory 
      ? categorie.trim() 
      : newCategorie.trim();

    if (!finalCategorie) {
      setError("Veuillez sélectionner ou entrer une catégorie");
      return;
    }

    setError(null);
    startTransition(async () => {
      try {
        const result = await createAlimentationAction(aliment.trim(), finalCategorie);
        if (result.success) {
          setAliment("");
          setCategorie("");
          setNewCategorie("");
          // Recharger les catégories pour inclure la nouvelle
          const updatedCategories = await getCategories();
          setExistingCategories(updatedCategories);
          // Optionnel: rediriger vers la page d'accueil
          window.location.href = "/";
        } else {
          setError(result.error || "Erreur lors de la création de l'aliment");
        }
      } catch (err) {
        console.error("Erreur lors de la création:", err);
        setError("Erreur lors de la création de l'aliment");
      }
    });
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <Link
        href="/"
        className="text-blue-500 hover:text-blue-600 transition-colors self-start"
      >
        ← Retour
      </Link>
      <h1 className="text-2xl font-bold text-gray-800">Ajouter un aliment</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <input
            type="text"
            value={aliment}
            onChange={(e) => {
              setAliment(e.target.value);
              setError(null);
            }}
            placeholder="Nom de l'aliment"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            disabled={isPending}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={useExistingCategory}
                onChange={() => {
                  setUseExistingCategory(true);
                  setError(null);
                }}
                className="w-4 h-4"
                disabled={isPending}
              />
              <span className="text-sm">Utiliser une catégorie existante</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={!useExistingCategory}
                onChange={() => {
                  setUseExistingCategory(false);
                  setError(null);
                }}
                className="w-4 h-4"
                disabled={isPending}
              />
              <span className="text-sm">Créer une nouvelle catégorie</span>
            </label>
          </div>

          {useExistingCategory ? (
            <select
              value={categorie}
              onChange={(e) => {
                setCategorie(e.target.value);
                setError(null);
              }}
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              disabled={isPending || existingCategories.length === 0}
            >
              <option value="">
                {existingCategories.length === 0 
                  ? "Aucune catégorie disponible" 
                  : "Sélectionner une catégorie"}
              </option>
              {existingCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              value={newCategorie}
              onChange={(e) => {
                setNewCategorie(e.target.value);
                setError(null);
              }}
              placeholder="Nom de la nouvelle catégorie"
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              disabled={isPending}
            />
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        <button
          type="submit"
          disabled={
            isPending || 
            !aliment.trim() || 
            (useExistingCategory && !categorie.trim()) ||
            (!useExistingCategory && !newCategorie.trim())
          }
          className="bg-gray-500 text-white p-3 rounded-md cursor-pointer hover:bg-gray-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Ajout en cours..." : "Ajouter"}
        </button>
      </form>
    </div>
  );
};