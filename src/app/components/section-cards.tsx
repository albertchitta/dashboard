import React from "react";
import { IconTrendingUp } from "@tabler/icons-react";
import { arrayMove, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { schema } from "../schemas/card";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import initialData from "../dashboard/cardData.json";
import type z from "zod";

export function SectionCards() {
  const [data, setData] = React.useState(() => initialData);
  const sortableId = React.useId();

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data?.map(({ id }) => id) || [],
    [data]
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over.id);
        return arrayMove(data, oldIndex, newIndex);
      });
    }
  }

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        sensors={sensors}
        id={sortableId}
      >
        <SortableContext items={dataIds}>
          {data.map((item) => (
            <SectionCard key={item.id} item={item} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}

function SectionCard({ item }: { item: z.infer<typeof schema> }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      className="@container/card"
      id={item.id}
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <CardHeader>
        <CardDescription>{item.description}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {item.title}
        </CardTitle>
        <CardAction>
          <Badge variant="outline">
            <IconTrendingUp />
            {item.percentage}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          {item.footer_main} <IconTrendingUp className="size-4" />
        </div>
        <div className="text-muted-foreground">{item.footer_sub}</div>
      </CardFooter>
    </Card>
  );
}
