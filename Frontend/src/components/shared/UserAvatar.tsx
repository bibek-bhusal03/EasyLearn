import React from 'react'
import Avatar from "@/components/ui/avatar"

export default function UserAvatar({ name, size = 40 }: { name: string; size?: number }) {
  return <Avatar name={name} size={size} />
}
