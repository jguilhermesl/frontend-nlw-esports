import React, { FormEvent, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import logo from "../../assets/logo.svg";
import { api } from "../../services/api";
import { Games } from "../../@types/types";

import { Game } from "../../components/Game";
import { Input } from "../../components/Input";
import { Check } from "phosphor-react";
import { ButtonDay } from "../../components/ButtonDay";

interface DayProps {
  day: string;
  hasAdded: boolean;
  id: number;
}

export function Home() {
  const [games, setGames] = useState<Games[]>([]);
  const [gameSelected, setGameSelected]= useState<string>("")
  const [nickname, setNickname] = useState<string>("");
  const [yearsPlayed, setYearsPlayed] = useState<number>(0);
  const [discord, setDiscord] = useState<string>("");
  const [days, setDays] = useState<DayProps[]>([
    { day: "Segunda", hasAdded: false, id: 0 },
    { day: "Terça", hasAdded: false, id: 1 },
    { day: "Quarta", hasAdded: false, id: 2 },
    { day: "Quinta", hasAdded: false, id: 3 },
    { day: "Sexta", hasAdded: false, id: 4 },
    { day: "Sábado", hasAdded: false, id: 5 },
    { day: "Domingo", hasAdded: false, id: 6 }
  ]);
  const [state, setState] = useState<any>();
  const [timeDay, setTimeDay] = useState<string>("");
  const [channelVoice, setChannelVoice] = useState<boolean>(false);

  useEffect(() => {
    loadGames();
  }, []);

  async function loadGames() {
    await api.get("/games").then((res) => {
      setGames(res.data);
    });
  }

  async function handleAd(e: FormEvent) {
	e.preventDefault();

	const data = { name: nickname, yearsPlaying: yearsPlayed, discord, weekDays: JSON.stringify(days), hourStart: "16:00", hourEnd: "20:00", useVoiceChannel: channelVoice } 

	if (gameSelected == "") {
		alert("Selecione o jogo.")

		return;
	}
	await api.post(`/games/${gameSelected}/ads`, data).then( (res) => {
		alert('Anúncio publicado com sucesso.')
	})
  }

  function addDayOnDaysToPlay(day: string, id: number) {
    let objDay = days.find((d) => d.day == day);
    if (objDay?.hasAdded == true) {
      let daysToFilter = days;
      daysToFilter[id] = { day, hasAdded: false, id };
      setState(Math.random());
      setDays(daysToFilter);
    } else {
      let daysToFilter = days;
      daysToFilter[id] = { day, hasAdded: true, id };
      setState(Math.random());
      setDays(daysToFilter);
    }
  }

  return (
    <Dialog.Root>
      <div className="mx-auto w-full px-8 flex flex-col items-center">
        <div className="mx-auto flex flex-col items-center mt-20 mb-20">
          <img src={logo} alt="" />
          <h1 className="text-5xl text-white font-black mt-8">
            Seu{" "}
            <span className="bg-nlw-gradient text-transparent bg-clip-text">
              duo
            </span>{" "}
            está aqui.
          </h1>
        </div>
        <div className="flex items-center justify-center gap-8 mb-8 w-[90vw]">
          {games.map((game) => (
            <Game
              key={game.id}
              title={game.title}
              banner={game.bannerUrl}
              adsCount={game.ads.length}
            />
          ))}
        </div>
        <div className="pt-1 bg-nlw-gradient rounded-lg mt-8 overflow-hidden w-[90vw]">
          <div className="w-full flex items-center justify-between bg-[#2A2634] px-8 py-6 rounded-lg">
            <div className="flex flex-col gap-2">
              <h1 className="font-black text-2xl text-white">
                Não encontrou seu duo?
              </h1>
              <p className="text-[#A1A1AA]">
                Publique um anúncio para encontrar novos players
              </p>
            </div>
            <Dialog.Trigger className="py-2 bg-[#8B5CF6] text-white font-semibold px-4 rounded-sm">
              Publicar anúncio
            </Dialog.Trigger>
          </div>
        </div>

        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
          <Dialog.Content className="fixed w-[488px] bg-[#2A2634] py-8 px-10 text-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg shadow-black/25">
            <Dialog.Title className="text-3xl font-black">
              Publique um anúncio
            </Dialog.Title>
            <form className="mt-8" onSubmit={handleAd}>
              <div className="flex flex-col">
                <label className="text-base font-semibold">Qual o game?</label>
                <select
                  placeholder="Selecione o game que deseja jogar"
                  className="mt-2 bg-zinc-900 text-zinc-100 h-[50px] rounded-[4px] px-4 block w-full p-2.5 appearance-none"
				  onChange={(e: any) => setGameSelected(e.target.value)}
                >
					<option disabled selected value="">Selecione o jogo que deseja jogar...</option>
                  {games.map((game) => (
                    <option key={game.id} value={game.id}>{game.title}</option>
                  ))}
                </select>
              </div>
              <Input
                placeholder="Como te chamam dentro do game?"
                title="Seu nome (ou nickname)"
                value={nickname}
                onChange={(e: any) => setNickname(e.target.value)}
              />
              <div className="flex gap-2">
                <Input
                  placeholder="Joga há quantos anos?"
                  title="Tudo bem ser zero"
                  value={yearsPlayed}
				  type="number"
                  onChange={(e: any) => setYearsPlayed(e.target.value)}
                />
                <Input
                  placeholder="Usuário#000"
                  title="Qual seu discord?"
                  value={discord}
                  onChange={(e: any) => setDiscord(e.target.value)}
                />
              </div>
              <div className="mt-4 flex flex-col">
                <label className="text-base font-semibold">
                  Quando costuma jogar?
                </label>
                <div className="flex mt-2">
                  {days.map((day) => {
                    return (
                      <ButtonDay
                        key={day.id}
                        day={day.day}
                        hasAdded={day.hasAdded}
                        id={day.id}
                        addDayOnDaysToPlay={addDayOnDaysToPlay}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <button
                  onClick={() => setChannelVoice(!channelVoice)}
                  type="button"
                  className={`bg-zinc-900 w-6 h-6 rounded hover:opacity-90 active:opacity-70 flex items-center justify-center`}
                >
                  {channelVoice && (
                    <Check size={20} color={"#34D399"} weight="bold" />
                  )}
                </button>
                <p className="font-normal text-sm ml-2">
                  Costumo me conectar ao chat de voz
                </p>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  className="bg-zinc-500 text-white font-semibold text-base px-5 py-2 rounded hover:opacity-90 active:opacity-70"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#8B5CF6] text-white font-semibold text-base px-5 py-2 rounded ml-2 hover:opacity-90 active:opacity-70"
                >
                  Encontrar duo
                </button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </div>
    </Dialog.Root>
  );
}
