# Studio Occasus - Service Model Decisions (2026-04-13)

## TL;DR - Strategic Pivot

**OLD:** Collection of free AI tools
**NEW:** Freemium clarity service for founders/consultants who need sharp messaging

---

## Core Decisions

### 1. POSITIONING
- **Service:** "Get your core message right before you spend on marketing"
- **Why:** Clarity Methodology + tools beat tools-only
- **Target:** Founders, consultants, small creative teams (not agencies or hobbyists)

### 2. MONETIZATION
| Tier | Price | Limits | Features |
|------|-------|--------|----------|
| **Free** | $0 | 3 rewrites/day<br/>1 brand msg/week<br/>limited exports | All tools<br/>message save<br/>basic export |
| **Pro** | $18/mth | Unlimited | All free features<br/>+ versioning<br/>+ team collab (5 users)<br/>+ priority email |
| **Team** | $99/mth | Unlimited | All pro features<br/>+ brand vault<br/>+ admin controls<br/>+ SSO (future) |

### 3. MUST-HAVE TECH
- [x] **User accounts** (Firebase Auth: email + Google)
- [x] **Payment processing** (Stripe subscriptions)
- [x] **Firestore** (save messages, projects, settings)
- [ ] **Admin dashboard** (user stats, revenue, churn)
- [ ] **Email sequence** (onboarding, reactivation)

### 4. UX TRANSFORMATION
**Free user flow:**
1. Landing page → "What's your core message?"
2. 5-question diagnostic → "Message Clarity Report"
3. Show gap: "Your clarity: 4/10 → Potential: 9/10"
4. One free rewrite → Save & Share
5. Auto-show pro upgrade CTA

**Pro user flow:**
1. Same entry point
2. Unlimited rewrites + save history
3. Brand Voice Handbook tool
4. Campaign Brief Generator tool
5. Team invitations

### 5. COPY & MARKETING
- Replace "Tool" language with "Process" language
- Clarity Rewriter → Message Clarity Engine
- Brand Message Generator → Positioning Builder
- UTM Builder → Campaign Architecture Toolkit
- Emphasize: "Repeatable methodology, powered by AI"

---

## BLOCKERS (Deal-breakers if not resolved)

| Blocker | Owner | Status | Timeline |
|---------|-------|--------|----------|
| Firebase web config empty on deployed site | Agent 8 | ⏳ TODO | 1-2 days |
| Current site regression testing | Agent 5 | ⏳ TODO | 1 day |
| Backend security review (auth + stripe) | Agent 9 | ⏳ TODO | 2 days |
| Auth layer implementation | Agent 3 + 8 | ⏳ TODO | 2-3 days |
| Stripe sandbox testing | Agent 8 | ⏳ TODO | 1 day |

---

## SUCCESS MILESTONES

### Week 1: Foundation
- [ ] Firebase config filled + Google Sign-In working on live URL
- [ ] Current tools validated (no regressions)
- [ ] Strategic brief updated (Agent 1)

### Week 2: Auth layer
- [ ] User account creation working
- [ ] Message save/load working
- [ ] Free tier limits enforced

### Week 3: Payment
- [ ] Stripe integration live in staging
- [ ] Tier upgrade UI working
- [ ] Pricing A/B tested

### Week 4: Launch
- [ ] "Early Access Beta - Pro free for 30 days" campaign
- [ ] First 100 free users target
- [ ] Analytics tracking live

---

## KEY METRICS TO WATCH

**For product growth:**
- Free tier sign-up rate (target: 50+/week)
- Free → Pro conversion (target: 2-5%)
- Time to first tool use (target: <2 min)
- Churn rate (target: <5%/month)
- LTV/CAC ratio (target: >3x)

**For product quality:**
- Message save rate = engagement signal
- Tool usage concentration (which drives conversion?)
- Support response time

---

## TEAM ASSIGNMENTS (Who owns what)

| Task | Owner | Co-owner | When |
|------|-------|----------|------|
| Strategic brief (service positioning) | Agent 1 | Agent 12 | This week |
| Unblock Firebase config | Agent 8 | Agent 3 | URGENT |
| Validate current live state | Agent 5 | Agent 3 | ASAP |
| UX progression design | Agent 2 | Agent 10 | This week |
| Backend auth implementation | Agent 8 | Agent 9 | Week 2 |
| Frontend auth UI | Agent 3 | Agent 2 | Week 2 |
| Stripe integration | Agent 8 | Agent 3 | Week 3 |
| Copy rewrite (service narrative) | Agent 4 | Agent 1 | This week |
| Security review (auth + stripe) | Agent 9 | Agent 8 | Before deploy |
| Onboarding content | Agent 10 | Agent 4 | Week 2 |
| QA + staging deploy | Agent 5 | Agent 6 | Week 3 |
| Go/no-go review | Agent 6 | Agent 5 | Before launch |

---

## NEXT IMPROVEMENT ROADMAP (2026-04-14 audit)

### Sprint 1 — Débloquer le revenu (PRIORITAIRE)
| Task | Owner | Co-owner | Impact |
|------|-------|----------|--------|
| Valider Stripe end-to-end (env vars + test mode + live checkout) | Agent 8 | Agent 9 | Bloquant pour tout revenu |
| Migrer les limites freemium en Firestore (server-side enforcement) | Agent 8 | Agent 3 | Sans ça, le paywall est contournable via localStorage clear |
| Ajouter analytics minimal (PostHog ou GA4) avec events: `page_view`, `tool_used`, `paywall_hit`, `signup`, `checkout_started`, `checkout_completed` | Agent 3 | Agent 5 | Aucune visibilité funnel actuellement |

### Sprint 2 — Multiplier la conversion
| Task | Owner | Co-owner | Impact |
|------|-------|----------|--------|
| Intégrer 1 appel IA réel (Cloud Function) pour le Message Clarity Engine | Agent 8 | Agent 3 | Différenciation critique — outil actuel = dictionnaire de ~30 termes, pas de vraie réécriture. Limite à 3/jour free, illimité Pro = meilleur levier de conversion |
| Implémenter l'onboarding guidé (Mission 01) | Agent 2 | Agent 10 | Utilisateur perdu sans guidance → "première victoire en 30s" |

### Sprint 3 — Augmenter le taux Pro
| Task | Owner | Co-owner | Impact |
|------|-------|----------|--------|
| Export PDF pour Clarity Report + Positioning Builder | Agent 3 | Agent 2 | Promis dans le pricing, non implémenté. Consultants veulent un livrable client |
| Séquence email post-inscription (J0/J2/J5/J7) | Agent 4 | Agent 10 | Zéro nurturing actuellement après signup |

### Sprint 4 — Rétention long terme
| Task | Owner | Co-owner | Impact |
|------|-------|----------|--------|
| Synchroniser gamification (XP/streaks/badges) en Firestore | Agent 8 | Agent 3 | Tout est perdu au clear cache ou changement de device |
| Brand Vault (stocker positionnement + voix de marque, pré-remplir les outils) | Agent 2 | Agent 3 | Killer feature consultants — transforme usage one-shot en plateforme indispensable |
| Dashboard admin avec métriques business (signups, MRR, churn, usage/outil) | Agent 8 | Agent 5 | Aucune visibilité business opérationnelle |

### Faiblesses critiques identifiées (audit 2026-04-14)
1. **Pas de vraie IA** — Tous les outils sont des heuristiques client-side (dictionnaires, regex, comptage syllabes). L'écart entre le marketing "AI-powered" et la réalité va décevoir les users.
2. **Limites freemium triviales à contourner** — localStorage uniquement, aucune vérification serveur.
3. **Gamification volatile** — localStorage uniquement, perdu au clear cache.
4. **Zéro analytics** — Impossible de mesurer conversion, adoption, churn.
5. **Exports promis mais non implémentés** — PDF/Notion/Figma mentionnés dans le pricing.
6. **Pas d'onboarding** — Drop direct dans le workspace, pas de guidance.
7. **Scores diagnostic arbitraires** — Le scoring "4/10 → 9/10" est basé sur les sélections dropdown, pas sur une vraie analyse de texte.

---

## ANTI-PATTERNS (What NOT to do)

❌ Skip Firebase fix thinking "we'll do it later"
❌ Launch with no user authentication
❌ Deploy Stripe without security review
❌ Add "pro features" that free users actually need
❌ Implement premium tier before onboarding is strong
❌ Change pricing midway through early access

---

## COMMUNICATION CADENCE

- **Daily standup:** 5 min async check-in in `agent-log.md`
- **Blocker escalation:** Tag Agent 12 if stuck on decision
- **Weekly sync:** Friday review of progress vs plan
- **Deploy gate:** Never ship without Agent 6 + Agent 5 sign-off

---

## REFERENCE DOCS

- Full reunion notes: `reunion-strategique-2026-04-13.md`
- Team collaboration protocol: `team-collaboration-protocol.md`
- Product brief: `README.md`
- Agent roster: All `agent-*-.md` files in this folder

---

**Status:** ✅ Decisions locked in. Roadmap updated 2026-04-14.
**Next action:** Sprint 1 — Stripe validation + analytics + server-side limits.
**Escalation path:** If stuck, call Agent 12 (team-manager).
**Backup reminder:** `scripts/project-backup.ps1` before any risky change.

