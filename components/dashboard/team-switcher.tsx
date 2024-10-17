"use client";

import * as React from "react";
import { useOKR } from "@/context/OKRContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TeamSwitcher() {
  const {
    regioesMetropolitanas,
    hierarchicalSelection,
    setHierarchicalSelection,
    getCidadesByRegiaoMetropolitana,
    getZonasByCidade,
    getDistritosByZona,
    getAreasByDistrito,
    getEquipesByArea,
  } = useOKR();

  const handleRegiaoChange = (value: string) => {
    setHierarchicalSelection({
      regiaoMetropolitanaId: parseInt(value),
      cidadeId: undefined,
      zonaId: undefined,
      distritoId: undefined,
      areaId: undefined,
      equipeId: undefined,
    });
  };

  const handleCidadeChange = (value: string) => {
    setHierarchicalSelection((prev) => ({
      ...prev,
      cidadeId: parseInt(value),
      zonaId: undefined,
      distritoId: undefined,
      areaId: undefined,
      equipeId: undefined,
    }));
  };

  const handleZonaChange = (value: string) => {
    setHierarchicalSelection((prev) => ({
      ...prev,
      zonaId: parseInt(value),
      distritoId: undefined,
      areaId: undefined,
      equipeId: undefined,
    }));
  };

  const handleDistritoChange = (value: string) => {
    setHierarchicalSelection((prev) => ({
      ...prev,
      distritoId: parseInt(value),
      areaId: undefined,
      equipeId: undefined,
    }));
  };

  const handleAreaChange = (value: string) => {
    setHierarchicalSelection((prev) => ({
      ...prev,
      areaId: parseInt(value),
      equipeId: undefined,
    }));
  };

  const handleEquipeChange = (value: string) => {
    setHierarchicalSelection((prev) => ({
      ...prev,
      equipeId: parseInt(value),
    }));
  };

  const cidades = hierarchicalSelection.regiaoMetropolitanaId
    ? getCidadesByRegiaoMetropolitana(
        hierarchicalSelection.regiaoMetropolitanaId
      )
    : [];

  const zonas = hierarchicalSelection.cidadeId
    ? getZonasByCidade(hierarchicalSelection.cidadeId)
    : [];

  const distritos = hierarchicalSelection.zonaId
    ? getDistritosByZona(hierarchicalSelection.zonaId)
    : [];

  const areas = hierarchicalSelection.distritoId
    ? getAreasByDistrito(hierarchicalSelection.distritoId)
    : [];

  const equipes = hierarchicalSelection.areaId
    ? getEquipesByArea(hierarchicalSelection.areaId)
    : [];

  return (
    <div className="flex space-x-2">
      {/* Região Metropolitana Select */}
      <Select
        onValueChange={handleRegiaoChange}
        value={hierarchicalSelection.regiaoMetropolitanaId?.toString()}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Região Metropolitana" />
        </SelectTrigger>
        <SelectContent>
          {regioesMetropolitanas.map((regiao) => (
            <SelectItem key={regiao.id} value={regiao.id.toString()}>
              {regiao.nome}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Cidade Select */}
      <Select
        onValueChange={handleCidadeChange}
        value={hierarchicalSelection.cidadeId?.toString()}
        disabled={!hierarchicalSelection.regiaoMetropolitanaId}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Cidade" />
        </SelectTrigger>
        <SelectContent>
          {cidades.map((cidade) => (
            <SelectItem key={cidade.id} value={cidade.id.toString()}>
              {cidade.nome}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Zona Select */}
      <Select
        onValueChange={handleZonaChange}
        value={hierarchicalSelection.zonaId?.toString()}
        disabled={!hierarchicalSelection.cidadeId}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Zona" />
        </SelectTrigger>
        <SelectContent>
          {zonas.map((zona) => (
            <SelectItem key={zona.id} value={zona.id.toString()}>
              {zona.nome}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Distrito Select */}
      <Select
        onValueChange={handleDistritoChange}
        value={hierarchicalSelection.distritoId?.toString()}
        disabled={!hierarchicalSelection.zonaId}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Distrito" />
        </SelectTrigger>
        <SelectContent>
          {distritos.map((distrito) => (
            <SelectItem key={distrito.id} value={distrito.id.toString()}>
              {distrito.nome}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Área Select */}
      <Select
        onValueChange={handleAreaChange}
        value={hierarchicalSelection.areaId?.toString()}
        disabled={!hierarchicalSelection.distritoId}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Área" />
        </SelectTrigger>
        <SelectContent>
          {areas.map((area) => (
            <SelectItem key={area.id} value={area.id.toString()}>
              {area.nome}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Equipe Select */}
      <Select
        onValueChange={handleEquipeChange}
        value={hierarchicalSelection.equipeId?.toString()}
        disabled={!hierarchicalSelection.areaId}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Equipe" />
        </SelectTrigger>
        <SelectContent>
          {equipes.map((equipe) => (
            <SelectItem key={equipe.id} value={equipe.id.toString()}>
              {equipe.nome}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
