import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./App.css";

const veiculoSchema = z.object({
  nome: z.string().min(2, "Nome é obrigatório"),
  marca: z.string().min(1, "Marca é obrigatória"),
  modelo: z.string().min(1, "Modelo é obrigatório"),
  ano: z.string().min(4, "Ano deve ter pelo menos 4 dígitos").max(4),
  cor: z
    .string()
    .min(3, "Cor deve ter pelo menos 3 dígitos")
    .max(20)
    .transform(() => "Vermelho"),
});

type VeiculoFormData = z.infer<typeof veiculoSchema>;

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<VeiculoFormData>({
    resolver: zodResolver(veiculoSchema),
  });

  const onSubmit: SubmitHandler<VeiculoFormData> = (data) => {
    console.log("DADOS →", data);
    reset();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-slate-800 to-slate-900">
      <h1 className="text-white font-bold text-4xl mb-6">Lista de Carros</h1>

      <form
        onSubmit={handleSubmit(onSubmit, (err) => console.log("ERROS →", err))}
        className="flex flex-col gap-4 w-full max-w-sm"
      >
        {" "}
        <div className="flex flex-col gap-1">
          <label className="text-white">Nome</label>
          <input
            {...register("nome")}
            className="bg-gray-100 border border-gray-400 text-zinc-900 rounded px-2 py-1"
          />
          {errors.nome && (
            <label className="text-red-500 text-sm">
              {errors.nome.message}
            </label>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-white">Marca</label>
          <input
            {...register("marca")}
            className="bg-gray-100 border border-gray-400 text-zinc-900 rounded px-2 py-1"
          />
          {errors.marca && (
            <label className="text-red-500 text-sm">
              {errors.marca.message}
            </label>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-white">Modelo</label>
          <input
            {...register("modelo")}
            className="bg-gray-100 border border-gray-400 text-zinc-900 rounded px-2 py-1"
          />
          {errors.modelo && (
            <label className="text-red-500 text-sm">
              {errors.modelo.message}
            </label>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-white">Ano</label>
          <input
            {...register("ano")}
            className="bg-gray-100 border border-gray-400 text-zinc-900 rounded px-2 py-1"
          />
          {errors.ano && (
            <label className="text-red-500 text-sm">{errors.ano.message}</label>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-white">Cor</label>
          <input
            {...register("cor")}
            className="bg-gray-100 border border-gray-400 text-zinc-900 rounded px-2 py-1"
          />
          {errors.cor && (
            <label className="text-red-500 text-sm">{errors.cor.message}</label>
          )}
        </div>
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="bg-slate-700 hover:bg-slate-500 transition text-white py-2 rounded w-24 self-end"
          >
            Enviar
          </button>
          <button
            type="button"
            onClick={() => reset()}
            className="bg-red-600 text-white py-2 rounded w-24 self-end hover:bg-red-400 transition ml-2"
          >
            Limpar
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
