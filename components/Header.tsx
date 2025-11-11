import HeaderClient, { ContactItem } from './HeaderClient'
import { client } from '@/sanity/lib/client'
import { settingsQuery } from '@/sanity/lib/queries'

export default async function Header() {
  const settings = await client.fetch(settingsQuery)

  const contactItems: ContactItem[] = []

  if (settings?.email) {
    contactItems.push({ href: `mailto:${settings.email}`, label: 'Email' })
  }

  if (settings?.github) {
    contactItems.push({ href: settings.github, label: 'GitHub' })
  }

  if (settings?.linkedin) {
    contactItems.push({ href: settings.linkedin, label: 'LinkedIn' })
  }

  if (settings?.twitter) {
    contactItems.push({ href: settings.twitter, label: 'Twitter' })
  }

  if (settings?.arena) {
    contactItems.push({ href: settings.arena, label: 'Are.na' })
  }

  return <HeaderClient contactItems={contactItems} />
}

